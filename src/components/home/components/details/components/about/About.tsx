import './About.css';
import {useSelector} from "react-redux";
import {activeClinicSelector} from "@/store/selectors/clinicsSelectors";

function About() {
    const clinic = useSelector(activeClinicSelector);

    return (
        <div className="about">
            <p className="about__name">
                {clinic.name}
            </p>
            <div className="about__contacts">
                <p className="about__contacts__item">
                    <span>{clinic.city}</span>
                    <span>{clinic.state}</span>
                </p>
                <p className="about__contacts__item">
                    {clinic.email}
                </p>
            </div>
            <p className="about__text">
                {clinic.about}
            </p>
        </div>
    );
}

export default About;
