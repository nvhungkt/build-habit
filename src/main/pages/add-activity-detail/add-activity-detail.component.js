import React from 'react';
import { Content, Button, Text, Form, Item, Input, Label, Icon, Picker } from 'native-base';
import { TimePickerAndroid, DatePickerAndroid, Keyboard, View } from 'react-native';

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
const WEEKLY = 'WEEKLY';
const MONTHLY = 'MONTHLY';
const YEARLY = 'YEARLY';

export default class AddActivityDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startHour: null,
      startMinute: null,
      endHour: null,
      endMinute: null,
      yearlyDate: null,
      mode: WEEKLY,
      scheduler: datesOfWeek
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create new habit',
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: '#e91e63' }}>DONE</Text>
        </Button>
      )
    };
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

        this.setState({ yearlyDate, scheduler: [yearlyDate.toLocaleDateString()], mode: YEARLY });
      }
    } catch (error) {
      return;
    }
  }

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
    const { startHour, startMinute, endHour, endMinute, scheduler, mode } = this.state;

    const renderDateButton = (date, index) => (
      <Button
        transparent
        style={styles.icon}
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
      </Button>
    );

    const renderDatesOfWeek = () => {
      return (
        <View style={styles.row}>
          {datesOfWeek.map((dateOfWeek, index) => renderDateButton(dateOfWeek, index))}
        </View>
      );
    };

    const renderDatesOfMonth = () => {
      const datesOfMonth = [];

      for (let i = 1; i <= DATES_OF_MONTH; i++) {
        datesOfMonth.push(renderDateButton(i, i));
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

    return (
      <Content style={styles.container}>

        <View style={styles.row}>
          <Text style={styles.scheduler}>{scheduler.join(', ')}</Text>
          {
            mode === YEARLY ?
              <Button
                transparent
                style={styles.icon}
                onPress={() => this.openDatePickerYearly()}
              >
                <Icon style={{ color: '#e91e63' }} name='md-calendar' />
              </Button> :
              null
          }
        </View>

        <Form style={styles.form}>
          <Item floatingLabel>
            <Label style={styles.input}>Habit</Label>
            <Input />
          </Item>

          <Item floatingLabel>
            <Label style={styles.input}>Start time</Label>
            <Input
              onFocus={() => {
                Keyboard.dismiss();
                this.openTimePicker('startHour', 'startMinute');
              }}
              value={startHour ? `${startHour}:${startMinute}` : ''}
            />
          </Item>

          <Item floatingLabel>
            <Label style={styles.input}>End time</Label>
            <Input
              onFocus={() => {
                Keyboard.dismiss();
                this.openTimePicker('endHour', 'endMinute');
              }}
              value={endHour ? `${endHour}:${endMinute}` : ''}
            />
          </Item>

          <View style={{ marginLeft: 10, marginTop: 20 }}>
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
        </Form>

        {mode === WEEKLY ? renderDatesOfWeek() : null}
        {mode === MONTHLY ? renderDatesOfMonth() : null}
      </Content>
    );
  }
}
