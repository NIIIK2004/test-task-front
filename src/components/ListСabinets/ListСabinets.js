import Сabinet from './Сabinet'

export default function ListСabinets() {
    return (
        <section className="cabinets__wrapper">
            <div className="container">
                <h1 className="title">Список доступных шкафов</h1>
                <ul className="cabinets__list">
                    <Сabinet />
                    <Сabinet />
                    <Сabinet />
                    <Сabinet />
                    <Сabinet />
                    <Сabinet />
                    <Сabinet />
                    <Сabinet />
                    <Сabinet />
                </ul>
            </div>
        </section>
    )
}