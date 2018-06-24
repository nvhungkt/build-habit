import React from 'react';
import { Content, Button, Text, Item, Input, Label, Icon, Picker, Toast } from 'native-base';
import { TimePickerAndroid, DatePickerAndroid, View, Modal, Image, TouchableOpacity } from 'react-native';

import icons from '../../assets/icon-index';
import IconChoosingModal from './components/icon-choosing-modal';

import { styles, textStyles } from './add-activity-detail.style';

const datesOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATES_OF_MONTH = 31;
const FIRST_WEEK = 7;
const SECOND_WEEK = 14;
const THIRD_WEEK = 21;
const FOURTH_WEEK = 28;
const NOT_FOUND = -1;
const ARRAY_START = 0;
const ARRAY_STEP = 1;
const WEEKLY = 'weekly';
const MONTHLY = 'monthly';
const YEARLY = 'yearly';
const ON_TIME = 0;
const TOAST_DURATION = 3000;

const round = (number) => {
  let prefix = "";

  if (number < 10) {
    prefix = "0";
  }

  return prefix + number;
};

export default class AddActivityDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      icon: 'breakfast',
      tags: [],
      startHour: null,
      startMinute: null,
      endHour: null,
      endMinute: null,
      yearlyDate: null,
      mode: WEEKLY,
      scheduler: datesOfWeek,
      iconChoosingModal: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Create new habit',
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: (
        <Button transparent onPress={params.onAddActivity}>
          <Text style={{ color: '#e91e63' }}>DONE</Text>
        </Button>
      )
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ onAddActivity: this.onAddActivity });
  }

  componentDidUpdate(prevProps) {
    if (this.props.success !== prevProps.success) {
      if (this.props.success) {
        this.props.navigation.navigate('Home');
      }
      if (this.props.success === false) {
        Toast.show({
          text: this.props.activityStatus,
          buttonText: 'Okay',
          duration: TOAST_DURATION,
          type: 'warning',
          onClose: this.props.resetStatus
        });
      }
    }
  }

  async openTimePicker(hourPicker, minutePicker) {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        is24Hour: true,
        mode: 'default'
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({ [hourPicker]: hour, [minutePicker]: minute });
      }
    } catch (error) {
      return;
    }
  }

  async openDatePickerYearly() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open();

      if (action !== DatePickerAndroid.dismissedAction) {
        const yearlyDate = new Date(year, month, day);

        this.setState({ yearlyDate, scheduler: [`${round(yearlyDate.getMonth() + 1)}/${round(yearlyDate.getDate())}`], mode: YEARLY });
      }
    } catch (error) {
      return;
    }
  }

  onAddActivity = () => {
    const { title, description, icon, tags, startHour, startMinute, endHour, endMinute, scheduler, mode } = this.state;

    const schedule = {
      from: {
        hour: startHour,
        minute: startMinute
      },
      to: {
        hour: endHour,
        minute: endMinute
      },
      repetition: mode,
      times: scheduler,
      reminders: [ON_TIME]
    };

    this.props.addNewHabit && this.props.addNewHabit({ title, description, icon, schedule, tags });
  }

  onOpenIconChoosingModal = () => this.setState({ iconChoosingModal: true });

  onCloseIconChoosingModal = () => this.setState({ iconChoosingModal: false });

  onChooseIcon = icon => this.setState({ icon, iconChoosingModal: false });

  onChangeHabit = title => this.setState({ title });

  onChangeNotes = description => this.setState({ description });

  toggleScheduler = date => {
    const { scheduler } = this.state;
    const dateInScheduler = scheduler.indexOf(date);

    if (dateInScheduler === NOT_FOUND) {
      this.setState({
        scheduler: [
          ...scheduler,
          date
        ]
      });
    } else {
      this.setState({
        scheduler: [
          ...scheduler.slice(ARRAY_START, dateInScheduler),
          ...scheduler.slice(dateInScheduler + ARRAY_STEP)
        ]
      });
    }
  }

  changeMode = mode => {
    switch (mode) {
      case WEEKLY:
        this.setState({ mode, scheduler: datesOfWeek });
        break;
      case MONTHLY:
        this.setState({ mode, scheduler: [] });
        break;
      case YEARLY:
        this.openDatePickerYearly();
        break;
      default:
        return;
    }
  }

  render() {
    const {
      title,
      description,
      icon,
      startHour,
      startMinute,
      endHour,
      endMinute,
      yearlyDate,
      scheduler,
      mode,
      iconChoosingModal
    } = this.state;

    const renderDateButton = (date, index) => (
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => this.toggleScheduler(date)}
        key={index}
      >
        <Text
          style={
            scheduler.includes(date) ?
              textStyles.dateActive :
              textStyles.dateNotActive
          }
        >
          {date}
        </Text>
      </TouchableOpacity>
    );

    const renderDatesOfWeek = () => (
      <View style={styles.row}>
        {datesOfWeek.map((dateOfWeek, index) => renderDateButton(dateOfWeek, index))}
      </View>
    );

    const renderDatesOfMonth = () => {
      const datesOfMonth = [];

      for (let i = 1; i <= DATES_OF_MONTH; i++) {
        datesOfMonth.push(renderDateButton(`${i}`, i));
      }

      return (
        <React.Fragment>
          <View style={styles.row}>
            {datesOfMonth.slice(ARRAY_START, FIRST_WEEK).map(date => date)}
          </View>
          <View style={styles.row}>
            {datesOfMonth.slice(FIRST_WEEK, SECOND_WEEK).map(date => date)}
          </View>
          <View style={styles.row}>
            {datesOfMonth.slice(SECOND_WEEK, THIRD_WEEK).map(date => date)}
          </View>
          <View style={styles.row}>
            {datesOfMonth.slice(THIRD_WEEK, FOURTH_WEEK).map(date => date)}
          </View>
          <View style={styles.row}>
            {datesOfMonth.slice(FOURTH_WEEK).map(date => date)}
            <View style={{ flex: 4 }}></View>
          </View>
        </React.Fragment>
      );
    };

    const renderDateInput = () => (
      <View style={styles.row}>
        <View style={styles.iconTop}>
          <Icon style={styles.icon} name='md-calendar' />
        </View>
        <View style={styles.text}>
          <TouchableOpacity
            style={styles.timePicker}
            onPress={() => this.openDatePickerYearly()}
          >
            <Text style={textStyles.timeTitle}>Every</Text>
            <Text style={textStyles.time}>{yearlyDate ? `${yearlyDate.getDate()}/${yearlyDate.getMonth()}` : ''}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <Content style={styles.container}>
        <Text>{this.props.activityStatus}</Text>
        <TouchableOpacity style={styles.habitIcon} onPress={this.onOpenIconChoosingModal}>
          <Image style={styles.iconImage} source={icons[icon]} resizeMode='contain' />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={iconChoosingModal}
          onRequestClose={this.onCloseIconChoosingModal}
        >
          <IconChoosingModal onChooseIcon={this.onChooseIcon} />
        </Modal>

        <View style={styles.row}>
          <View style={styles.iconBottom}>
            <Icon style={styles.icon} name='md-create' />
          </View>
          <Item style={styles.text} floatingLabel>
            <Label style={styles.input}>Habit</Label>
            <Input onChangeText={this.onChangeHabit} value={title} />
          </Item>
        </View>

        <View style={styles.row}>
          <View style={styles.iconBottom}>
            <Icon style={styles.icon} name='md-list' />
          </View>
          <Item style={styles.text} floatingLabel>
            <Label style={styles.input}>Notes</Label>
            <Input onChangeText={this.onChangeNotes} value={description} />
          </Item>
        </View>

        <View style={styles.row}>
          <View style={styles.iconTop}>
            <Icon style={styles.icon} name='md-alarm' />
          </View>
          <View style={styles.text}>
            <TouchableOpacity
              style={styles.timePicker}
              onPress={() => this.openTimePicker('startHour', 'startMinute')}
            >
              <Text style={textStyles.timeTitle}>Start Time</Text>
              <Text style={textStyles.time}>{startHour ? `${startHour}:${startMinute}` : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timePicker}
              onPress={() => this.openTimePicker('endHour', 'endMinute')}
            >
              <Text style={textStyles.timeTitle}>End Time</Text>
              <Text style={textStyles.time}>{endHour ? `${endHour}:${endMinute}` : ''}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.iconCenter}>
            <Icon style={styles.icon} name='md-refresh' />
          </View>
          <View style={styles.text}>
            <Picker
              mode="dialog"
              selectedValue={mode}
              onValueChange={this.changeMode}
              >
              <Picker.Item label="Weekly" value={WEEKLY} />
              <Picker.Item label="Monthly" value={MONTHLY} />
              <Picker.Item label="Yearly" value={YEARLY} />
            </Picker>
          </View>
        </View>

        {mode === WEEKLY ? renderDatesOfWeek() : null}
        {mode === MONTHLY ? renderDatesOfMonth() : null}
        {mode === YEARLY ? renderDateInput() : null}
      </Content>
    );
  }
}
