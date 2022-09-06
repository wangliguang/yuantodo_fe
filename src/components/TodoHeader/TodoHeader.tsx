import {DatePicker} from 'antd'
import moment from 'moment'

export const DATE_FORMATE = 'YYYY-MM-DD'

type TopHeaderProps = {
  onDateChange: (beginDate: string, endDate: string) => void
}

export function TodoHeader({onDateChange}: TopHeaderProps) {
  const onDayChange = (_: any, dateString: string) => {
    onDateChange(dateString, moment(dateString).add(1, 'days').format(DATE_FORMATE))
  }

  return (
    <div className="header">
      <span className="logo">猿TODO</span>
      <DatePicker
        defaultValue={moment(new Date())}
        defaultPickerValue={moment(new Date())}
        style={{marginLeft: '20px'}}
        onChange={onDayChange}
      />
    </div>
  )
}
