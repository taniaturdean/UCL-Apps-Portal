import "./Footer.css";
import { useMediaQuery } from 'react-responsive';

const Footer = () => {

  const isPhone = useMediaQuery({ minWidth: 0, maxWidth: 450 });
  const isDesktop = useMediaQuery({ minWidth: 451 });

  const getClassName = (baseClassName) => {
    if (isDesktop) return `${baseClassName}--desktop`;
    if (isPhone) return `${baseClassName}--phone`;
    return baseClassName;
  };

  return (
    <div className={getClassName("footer")}>
      <div className={getClassName("footer-subsection")}>
        <div className={getClassName("footer-subheadings")}>
          <div className={getClassName("our-team")}>Our Team</div>
          <div className={getClassName("our-team")}>FAQs</div>
          <div className={getClassName("our-team")}>Contact Us</div>
        </div>
        <div className={getClassName("footer-heading")}>
          <div className={getClassName("about-us1")}>About Us</div>
          <div className={getClassName("footer-heading-child")} />
        </div>
      </div>
      <div className={getClassName("footer-subsection")}>
        <div className={getClassName("footer-subheadings")}>
          <div className={getClassName("our-team")}>Privacy Notice</div>
          <div className={getClassName("our-team")}>Copyright</div>
          <div className={getClassName("our-team")}>Cookie Policy</div>
        </div>
        <div className={getClassName("footer-heading")}>
          <div className={getClassName("about-us1")}>Legal</div>
          <div className={getClassName("footer-heading-child")} />
        </div>
      </div>
      <div className={getClassName("footer-subsection")}>
        <div className={getClassName("footer-subheadings")}>
          <div className={getClassName("our-team")}>Alumni</div>
          <div className={getClassName("our-team")}>Businesses</div>
          <div className={getClassName("our-team")}>Media Relations</div>
        </div>
        <div className={getClassName("footer-heading")}>
          <div className={getClassName("about-us1")}>Connect with UCL</div>
          <div className={getClassName("footer-heading-child")} />
        </div>
      </div>
      <div className={getClassName("footer-subsection")}>
        <div className={getClassName("footer-subheadings")}>
          <div className={getClassName("our-team")}>Social Media</div>
          <div className={getClassName("our-team")}>Software Links</div>
          <div className={getClassName("our-team")} />
        </div>
        <div className={getClassName("footer-heading")}>
          <div className={getClassName("about-us1")}>Resources</div>
          <div className={getClassName("footer-heading-child")} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
