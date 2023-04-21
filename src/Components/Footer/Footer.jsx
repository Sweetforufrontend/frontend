import React from "react";
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={css.container}>
      <div className={css.max_width}>
        <div className={css.footer_container}>
          {/* Col 1 */}
          <div className={css.m_row1}>
            <div className={css.col1}>
              <h2>Company</h2>
              <div className={css.col1_items}>
                <a href="">Contact Us</a>
                <a href="">About Us</a>
                <a href="">Privacy Policy</a>
              </div>
            </div>
            {/* col2 */}
            <div className={css.col1}>
              <h2>Help</h2>
              <div className={css.col1_items}>
                <a href="">Payments</a>
                <a href="">Shipping</a>
                <a href="">Order Status</a>
              </div>
              {/* <a href=""></a> */}
            </div>
          </div>
          <div className={css.m_row2}>
            {/* col3 */}
            <div className={css.col1}>
              <h2>Consumer Policy</h2>
              <div className={css.col1_items}>
                <a href="">Return Policy</a>
                <a href="/termsofservice">Terms of Service</a>
                <a href="">Security</a>
                <a href="">Privacy</a>
              </div>
            </div>
            {/* Col 4 */}
            <div className={css.col1}>
              <h2>Socials</h2>
              <div className={css.col1_items}>
                <a href="">Facebook</a>
                <a href="">Twitter</a>
                <a href="">Instagram</a>
                <a href="">Youtube</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
