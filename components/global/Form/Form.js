import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/router";
import getDay from "date-fns/getDay";

const Form = ({
  popup,
  setTrigger,
  downloadBrochure,
  radio,
  syllabus,
  upSkillingHide,
  thankyou,
}) => {
  const router = useRouter();
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //offset to maintain time zone difference
  const [disable, setDisable] = useState(false);
  const [value, setValue] = useState();
  const [error, setError] = useState();
  const [alertMSG, setAlertMSG] = useState("");
  const [toggle, setToggle] = useState(true);
  const [query, setQuery] = useState({
    name: "",
    email: "",
    phone: "",
    upskillPlanning: "",
    upskillingObjective: "",
    workExperience: "",
    Brief: "",
    dateTime: "",
    WAdropdown: "",
    currentOrganization: "",
    currentDesignation: "",
    url: router.asPath,
  });
  useEffect(() => {
    setQuery({ ...query, phone: value, });
  }, [value]);

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const redirection = async () => {
    console.log("redirect");
    const myTimeout = setTimeout(() => {
      router.push("https://course.learnbay.co/Thank-you");
    }, 500);
  };
  let endPoint = "https://getform.io/f/85e92281-63f9-4d2f-b946-31d1098532f4";
  if (thankyou) {
    endPoint = "https://getform.io/f/85e92281-63f9-4d2f-b946-31d1098532f4";
  }

  let btnText = "Apply For Counselling";


  // Form Submit function
  const formSubmit = (e) => {
    e.preventDefault();
    if (
      query.upskillingObjective === "Tell us about your upskilling objective?"
    ) {
      setError(true);
    } else if (
      query.upskillPlanning === "How soon are you planning to upskill?"
    ) {
      setError(true);
    } else if (query.upskillPlanning === "Select an option") {
      setError(true);
    } else if (query.upskillingObjective === "Select an option") {
      setError(true);
    } else if (query.upskillPlanning === "") {
      setError(true);
    } else if (query.upskillingObjective === "") {
      setError(true);
    } else {
      setError(false);
      const formData = new FormData();
      Object.entries(query).forEach(([key, value]) => {
        formData.append(key, value);
      });
      fetch(`${endPoint}`, {
        method: "POST",
        body: formData,
      }).then(
        () => setAlertMSG(""),
        setQuery({
          name: "",
          email: "",
          phone: "",
          upskillPlanning: "",
          upskillingObjective: "",
          jobDescription: "",
          workExperience: "",
          dateTime: "",
          WAdropdown: "",
          currentOrganization: "",
          currentDesignation: "",
          url: router.asPath,
        })
      );
      if (popup) {
        const off = () => {
          setTrigger(false);
        };
        off();
      }
      if (thankyou) {
        router.push("/tutorial/Thank-you");
      }
    
    
    
      if (router.pathname === "/tutorial/Thank-you") {
        setToggle(false);
        setAlertMSG("Form Submitted successfully");
        setDisable(false);
        setValue("");
      }
    }
  };

  const formSubmitDownload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    fetch(`${endPoint}`, {
      method: "POST",
      body: formData,
    }).then(
      () => setAlertMSG(""),
      setQuery({
        name: "",
        email: "",
        phone: "",
        jobDescription: "",
        workExperience: "",
        dateTime: "",
        WAdropdown: "",
        currentOrganization: "",
        currentDesignation: "",
        url: router.asPath,
      })
    );
    if (popup) {
      const off = () => {
        setTrigger(false);
      };
      off();
    }
  
  

  
    if (router.pathname === "/tutorial/Thank-you") {
      setToggle(false);
      setAlertMSG("Form Submitted successfully");
      setDisable(false);
      setValue("");
    }
  };

  return (
    <div className={styles.App}>
      <form onSubmit={upSkillingHide ? formSubmitDownload : formSubmit}>
        <div className={styles.formWrapper}>
          <input
            type="text"
            name="name"
            className={popup ? styles.NameInputs : styles.NameInputs}
            required
            placeholder="Enter your Full Name"
            value={query.name}
            // style={{ borderBottom: "1px solid grey" }}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your Email"
            className={popup ? styles.EmailInputs : styles.EmailInputs}
            value={query.email}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <PhoneInput
            style={
              popup
                ? {
                    border: "0",
                    height: "50px",
                    borderRadius: "10px",
                    padding: "10px 10px",
                    border: "1px solid grey",
                  }
                : {
                    border: "0",
                    height: "50px",
                    borderRadius: "10px",
                    padding: "10px 10px",
                    border: "1px solid grey",
                  }
            }
            name="phone"
            rules={{ required: true }}
            defaultCountry="IN"
            placeholder="Enter Phone Number"
            className={popup ? styles.Phones : styles.Phone}
            value={value}
            onChange={setValue}
            required
          />
        </div>
        {upSkillingHide ? (
          ""
        ) : (
          <div className={popup ? styles.formWrappers : styles.formWrappers}>
            <select
              name="upskillPlanning"
              required
              value={query.upskillPlanning}
              onChange={handleParam()}
            >
              <option
                value="How soon are you planning to upskill?"
                selected
                hidden
              >
                How soon are you planning to upskill?
              </option>
              <option value="Select an option" disabled>
                Select an option
              </option>
              <option value="Immediately">Immediately</option>
              <option
                value="Within 1 to 2 weeks
"
              >
                Within 1 to 2 weeks
              </option>
              <option value="Within a Month ">Within a Month</option>
              <option value="Not yet decided">Not yet decided</option>
            </select>
          </div>
        )}

        {upSkillingHide ? (
          ""
        ) : (
          <div className={popup ? styles.formWrappers : styles.formWrappers}>
            <select
              name="upskillingObjective"
              required
              value={query.upskillingObjective}
              onChange={handleParam()}
            >
              <option
                value="Tell us about your upskilling objective?"
                selected
                hidden
              >
                Tell us about your upskilling objective?
              </option>
              <option value="Select an option" disabled>
                Select an option
              </option>
              <option value="Upskilling">Upskilling</option>
              <option value="Salary hike">Salary hike</option>
              <option value="Career switch">Career switch</option>
            </select>
          </div>
        )}
  

        {popup ? (
          <div className={popup ? styles.formWrappers : styles.formWrapper}>
            <input
              type="hidden"
              id="url"
              name="url"
              value={router.asPath}
            ></input>
          </div>
        ) : (
          ""
        )}
        {radio ? (
          <div className={popup ? styles.formWrappers : styles.formWrapper}>
            <input
              id="Data Science Program"
              value="Data Science & AI Courses "
              name="platform"
              required
              type="radio"
              onChange={handleParam()}
            />
            Data Science & AI Courses &nbsp;
            <br />
            <input
              id="Software (DSA & System Design)"
              value="Software (DSA & System Design)"
              name="platform"
              required
              type="radio"
              onChange={handleParam()}
            />
            Software (DSA & System Design)
          </div>
        ) : (
          ""
        )}
        {error ? (
          <p
            style={{
              margin: "0px 0px 5px 0px",
              color: "#0072bc",
              fontSize: "18px",
            }}
          >
            Please select a valid option
          </p>
        ) : (
          ""
        )}
        <div>{toggle ? "" : <p className={styles.alert}>{alertMSG}</p>}</div>
        {syllabus ? (
          <div className={styles.bottomWrap}>
            <p className={styles.FormText} style={{ fontSize: "10px" }}>
              By submitting the form, you agree to our Terms and Conditions and
              our Privacy Policy.
            </p>
            
          </div>
        ) : (
          <>
            <p className={styles.FormText} style={{ fontSize: "10px" }}>
              By submitting the form, you agree to our Terms and Conditions and
              our Privacy Policy.
            </p>
            <button type="submit" className={styles.button}>
              {downloadBrochure ? "Download Now" : btnText}{" "}
            </button>
          </>
        )}
        <input type="hidden" id="zc_gad" name="zc_gad" value="" />
      </form>
    </div>
  );
};

export default Form;
