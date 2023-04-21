import React from "react";
import css from "./ContactUs.module.css";

const ContactUs = () => {
  return (
    <div className={css.container}>
      <div className={css.max_width}>
        <form className={css.contactform_wrapper}>
          <h3 style={{fontSize: '1rem', color: 'black'}}>Contact Us</h3>
          <input type="text" name="name" id="" placeholder="Enter name" />
          <input
            type="email"
            name="email"
            id=""
            placeholder="example@gmail.com"
          />
          <textarea
            name="message"
            id=""
            cols="30"
            rows="10"
            placeholder="Enter your message.."
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
