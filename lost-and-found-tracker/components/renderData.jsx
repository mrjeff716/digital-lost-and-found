import emailjs from '@emailjs/browser';

export default function RenderData(props) {

  function isFound(id) {
      // Find the found item
      const foundItem = props.data.find(datum => datum.id === id);
      // Send EmailJS email 
      sendEmail(foundItem);
      return foundItem;
  }

  function sendEmail(item) {
    const templateParams = {
      to_name: "Jeffry",
      id: props.datum.id,
      itemType: props.datum.itemType,
      condition: props.datum.condition,
      description: props.datum.description
    };

    emailjs.send(
      'service_achzi3m',      // e.g., 'service_xxx'
      'template_73xisqg',     // e.g., 'template_xxx'
      templateParams,
      'UxooDdj-MUzreiXFS'       // e.g., 'user_xxx'
    )
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((err) => {
      console.error('Email sending failed:', err);
    });
  }

  function isNotFound(id) {
    props.setData((prevData) => prevData.filter(datum => datum.id !== id));
  }
  const image = String(props.datum.img) !== "no Image" ? props.datum.img : false
  console.log(image)
  return (
    <div className="item">
      {image ? <img src={image} alt={`Item ${props.datum.id}`} /> : <img src="/lost-and-found-tracker/images/noImage.png" alt={`Item ${props.datum.id}`} />}
      <p>Id: {props.datum.id}</p>
      <p>Type: {props.datum.itemType}</p>
      <p>Condition: {props.datum.condition}</p>
      <p>Description: {props.datum.description}</p>

      <div className="is-found-container">
        Is this your missing item?
        <div className="buttons-container">
          <button onClick={() => isFound(props.datum.id)}>Yes</button>
          <button className="no-button" onClick={() => isNotFound(props.datum.id)}>No</button>
        </div>
      </div>
    </div>
  );
}
