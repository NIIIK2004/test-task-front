import './Button.css';

export default function Button({ titleBtn, className = "button", onClick}) {
    return (
        <button onClick={onClick} className={className}>{titleBtn}</button>
    );
}
