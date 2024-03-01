import  Spinner  from 'react-bootstrap/Spinner';
import './LoaderComponents.scss';

const LoaderComponent = () => {
    return (
        <div className="loader_component">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoaderComponent
