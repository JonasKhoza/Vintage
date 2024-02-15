import classes from "./styles/footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={classes.customer_info}>
        <div className={classes.customer_service}>
          <h1>Customer Service</h1>
          <p>Whatsapp: +27 78 757 5555</p>
          <p>Customer care: 080 423 6646</p>
        </div>
        <address>
          <h1>Address</h1>
          <p>Street</p>
          <p> Krugersdorp</p>
          <p>Provice</p>
        </address>
        <div className={classes.social_media}>
          <h1>Follow us on</h1>
          <div className={classes.social_media_logos}>
            <a href="#ert">
              <img
                src={`${process.env.PUBLIC_URL}/images/social-media/Facebook_Logo.png`}
                alt="Facebook logo"
              />
            </a>
            <a href="#htt">
              <img
                src={`${process.env.PUBLIC_URL}/images/social-media/Instagram-Logo.png`}
                alt="Instagram logo"
              />
            </a>
            <a href="gbr">
              <img
                src={`${process.env.PUBLIC_URL}/images/social-media/Twitter-logo.svg.png`}
                alt="Twitter logo"
              />
            </a>
          </div>
        </div>
      </div>
      <div className={classes.company_policy}>
        <div className={classes.policies}>
          <a href="r">Terms and Conditions</a>
          <a href="ry">Privacy policy</a>
          <a href="tu">Cookies policy</a>
        </div>

        <p>{`©${new Date().getFullYear()} All rights reserved`}</p>
      </div>
    </footer>
  );
}

export default Footer;
