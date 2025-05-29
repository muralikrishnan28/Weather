
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'


export default function WeatherDetails ({icon, temp, city, country, lat, lon, humidity, wind}) {
return(
    <>
        <img src={icon} alt="Sunny" className="mt-5 mx-auto d-block" width="200px" />
        <div className="container-md text-center">
            <h2 className='mt-3 mb-0'><span className='display-6 fw-semibold text-warning text-bold'>{temp}</span> <sup>o</sup>C</h2>
            <h1 className="display-4 fw-normal text-info mb-0">{city}</h1>
            <h4 className="">{country}</h4>
        </div>
        <div className="container d-flex text-center justify-content-between m-0">
        <div className='mt-2'>
            <p className="mb-0">latitude</p>
            <p className="fw-medium text-primary">{lat}</p>
        </div>
        <div className=' mt-2'>
            <p className="mb-0 ">longitude</p>
            <p className="fw-medium text-primary ">{lon}</p>
        </div>
        </div>
        <div className="container d-flex align-items-center justify-content-between text-center mb-3">
            <div className=' mt-2'>
                <p className="mb-0 fw-semibold">{humidity} %</p>
                <p className="fw-medium text-primary mb-0 ">Humidity</p>
                <img src={humidityIcon} alt="" className="m-0" width="45px" />
            </div>
            <div className=' mt-2'>
                <p className="mb-0 fw-semibold">{wind} km/h</p>
                <p className="fw-medium text-primary mb-0 ">Wind Speed</p>
                <img src={windIcon} alt="" className="m-0" width="45px" />
            </div>
        </div>
    </>
    );
}