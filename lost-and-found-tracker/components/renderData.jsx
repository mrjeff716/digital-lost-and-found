import emailjs from '@emailjs/browser';

export default function RenderData(props) {

  function isFound(id) {
    // Update state first
    props.setData((prevData) => {
      const newData = prevData.map(datum => {
        if (datum.id === id) {
          return {...datum, isFound: true}
        } else {
          return {...datum}
        }
      });

      // Find the found item
      const foundItem = newData.find(datum => datum.id === id);

      // Send EmailJS email
      sendEmail(foundItem);

      return newData;
    });
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

  return (
    <div className="item">
      <img src={props.datum.img} alt={`Item ${props.datum.id}`} />
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
