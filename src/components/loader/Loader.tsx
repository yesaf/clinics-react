import medicalLoader from '@/assets/medical-loader.svg';
import './Loader.css';

export default function Loader() {
    return (
        <div className="loader">
            <img src={medicalLoader} alt="Loader"/>
        </div>
    );
}
