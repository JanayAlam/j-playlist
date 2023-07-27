const ErrorComponent = ({ code, msg }) => {
    return (
        <div>
            <h1>{code || 500}</h1>
            <p>{msg || 'Something went wrong!'}</p>
        </div>
    );
};

export default ErrorComponent;
