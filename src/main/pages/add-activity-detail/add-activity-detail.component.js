import React from 'react';
import { Content, Button, Text, Item, Input, Label, Icon, Picker, Toast } from 'native-base';
import { TimePickerAndroid, DatePickerAndroid, View, Modal, Image, TouchableOpacity } from 'react-native';

import { getToken } from '../../sqlite/token.storage';

import icons from '../../assets/icon-index';
import { formatDateDisplay, formatDateScheduleCallApi, convertDailyTimePoint } from '../../utils/time';
import {
  MAX_DATES_OF_MONTH,
  FIRST_WEEK,
  SECOND_WEEK,
  THIRD_WEEK,
  FOURTH_WEEK,
  HABIT_REPETITION,
  shortDaysOfWeek
} from '../../constant/time';

import IconChoosingModal from './components/icon-choosing-modal';

import { styles, textStyles } from './add-activity-detail.style';

const NOT_FOUND = -1;
const ARRAY_START = 0;
const ARRAY_STEP = 1;
const ON_TIME = 0;
const TOAST_DURATION = 3000;

const capitalizeFirstLetter = string => {
  return string.charAt(ARRAY_START).toUpperCase() + string.slice(ARRAY_STEP);
};

const getScheduler = schedule => {
  const { repetition, times = [] } = schedule;

  switch (repetition) {
    case HABIT_REPETITION.DAILY:
      return shortDaysOfWeek;
    case HABIT_REPETITION.WEEKLY:
      return times.map(time => capitalizeFirstLetter(time.day));
    case HABIT_REPETITION.MONTHLY:
      return times.map(time => `${time.date}`);
    case HABIT_REPETITION.YEARLY:
      return [formatDateScheduleCallApi(new Date())];
    default:
      return shortDaysOfWeek;
  }
};

export default class AddActivityDetail extends React.Component {
  constructor(props) {
    super(props);

    const template = props.navigation.getParam('template', {});
    const {
      id = undefined,
      title = '',
      description = '',
      icon = 'breakfast',
      tags = [],
      schedule = {}
    } = template;
    const { from, to, repetition = HABIT_REPETITION.DAILY } = schedule;

    this.state = {
      id,
      title,
      description,
      icon,
      tags,
      startHour: from && from.hour,
      startMinute: from && from.minute,
      endHour: to && to.hour,
      endMinute: to && to.minute,
      startDate: new Date(),
      endDate: null,
      yearlyDate: repetition === HABIT_REPETITION.YEARLY ? new Date() : null,
      mode: repetition,
      scheduler: getScheduler(schedule),
      iconChoosingModal: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Create new habit',
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: (
        <Button style={{ height: 54 }} onPress={params.onAddActivity} transparent>
          <Text style={{ color: '#E91E63' }}>DONE</Text>
        </Button>
      )
    };
  }

  componentDidMount() {
    this.getToken();
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

  getToken = async () => {
    this.token = await getToken();
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

        this.setState({
          yearlyDate,
          scheduler: [formatDateScheduleCallApi(yearlyDate)],
          mode: HABIT_REPETITION.YEARLY
        });
      }
    } catch (error) {
      return;
    }
  }

  async openDatePicker(type) {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open();

      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);

        this.setState({
          [type]: date
        });
      }
    } catch (error) {
      return;
    }
  }

  onAddActivity = () => {
    const {
      id,
      title,
      description,
      icon,
      tags,
      startHour,
      startMinute,
      endHour,
      endMinute,
      scheduler,
      mode
    } = this.state;
    const editMode = this.props.navigation.getParam('editMode', false);

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

    this.props.addNewHabit &&
      this.props.addNewHabit({ id, title, description, icon, schedule, tags, editMode }, this.token);
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
      case HABIT_REPETITION.DAILY:
        this.setState({ mode, scheduler: shortDaysOfWeek });
        break;
      case HABIT_REPETITION.WEEKLY:
        this.setState({ mode, scheduler: [] });
        break;
      case HABIT_REPETITION.MONTHLY:
        this.setState({ mode, scheduler: [] });
        break;
      case HABIT_REPETITION.YEARLY:
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
      startDate,
      endDate,
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

    const renderDaysOfWeek = () => (
      <View style={styles.row}>
        {shortDaysOfWeek.map((dateOfWeek, index) => renderDateButton(dateOfWeek, index))}
      </View>
    );

    const renderDatesOfMonth = () => {
      const datesOfMonth = [];

      for (let i = 1; i <= MAX_DATES_OF_MONTH; i++) {
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
          <View style={styles.row}></View>
          <View style={styles.row}></View>
          <View style={styles.row}></View>
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
            <Text style={textStyles.time}>{yearlyDate ? formatDateDisplay(yearlyDate) : ''}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <Content style={styles.container}>
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
              <Text style={textStyles.time}>{startHour ? convertDailyTimePoint(startHour, startMinute) : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timePicker}
              onPress={() => this.openTimePicker('endHour', 'endMinute')}
            >
              <Text style={textStyles.timeTitle}>End Time</Text>
              <Text style={textStyles.time}>{endHour ? convertDailyTimePoint(endHour, endMinute) : ''}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.iconTop}>
            <Icon style={styles.icon} name='md-calendar' />
          </View>
          <View style={styles.text}>
            <TouchableOpacity
              style={styles.timePicker}
              onPress={() => this.openDatePicker('startDate')}
            >
              <Text style={textStyles.timeTitle}>Start Date</Text>
              <Text style={textStyles.time}>{startDate ? startDate.toLocaleDateString() : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timePicker}
              onPress={() => this.openDatePicker('endDate')}
            >
              <Text style={textStyles.timeTitle}>End Date</Text>
              <Text style={textStyles.time}>{endDate ? endDate.toLocaleDateString() : 'Future'}</Text>
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
              <Picker.Item label="Daily" value={HABIT_REPETITION.DAILY} />
              <Picker.Item label="Weekly" value={HABIT_REPETITION.WEEKLY} />
              <Picker.Item label="Monthly" value={HABIT_REPETITION.MONTHLY} />
              <Picker.Item label="Yearly" value={HABIT_REPETITION.YEARLY} />
            </Picker>
          </View>
        </View>

        {mode === HABIT_REPETITION.WEEKLY ? renderDaysOfWeek() : null}
        {mode === HABIT_REPETITION.MONTHLY ? renderDatesOfMonth() : null}
        {mode === HABIT_REPETITION.YEARLY ? renderDateInput() : null}
      </Content>
    );
  }
}
