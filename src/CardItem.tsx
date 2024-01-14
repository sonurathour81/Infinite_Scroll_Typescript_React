import moment from 'moment';
import './App.css';

interface prop {
  field_photo_image_section: string,
  title: string,
  last_update: number
}

function CardItem(props: prop) {

  const { field_photo_image_section, last_update, title } = props
  const formattedDate = moment(last_update * 1000).format('MMM DD, YYYY hh:mm A [IST]');

  return <div className='cardItem'>
    <div className='cardImg'>
      <img src={field_photo_image_section} alt={field_photo_image_section} />
    </div>
    <div className='cardDesc'>
      <h5>{title}</h5>
      <h6>{formattedDate}</h6>
    </div>
  </div>

}

export default CardItem;
