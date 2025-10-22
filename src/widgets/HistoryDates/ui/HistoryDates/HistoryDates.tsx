import { useState } from "react";
import "./historyDates.scss";
// import "./historyDates2.scss";
import { historyDatesList } from "../../constants/historyDatesList";
import HistoryDatesChange from "../HistoryDatesChange/HistoryDatesChange";
import HistoryDatesSlider from "../HistoryDatesSlider/HistoryDatesSlider";

export default function HistoryDates() {
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [rotation, setRotation] = useState<number>(0);
    // Количество элементов
    const totalItems = historyDatesList.length;
    // Угол между элементами
    const angleStep = 360 / totalItems;

    // Рассчитываем позиции для элементов круга
    const getItemPosition = (index: number) => {
        const offsetAngle = 60;
        const angle = index * angleStep - offsetAngle;
        const radius = 265; // радиус круга

        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return { x, y };
    };

    // Обработчик клика по элементу круга
    const handleItemClick = (index: number) => {
        const targetRotation = -index * angleStep;
        setRotation(targetRotation);
        setActiveCategory(index);
    };

    const activeCategoryData = historyDatesList[activeCategory];
    return (
        <section className="history-dates">
            <h1 className="history-dates__title">
                Исторические <br />
                даты
            </h1>
            <div className="history-dates__line history-dates__middle-line"></div>
            <div className="history-dates__circle-wrapper">
                <div className="history-dates__circle">
                    <div className="history-dates__circle-figure">
                        <div className="history-dates-circle">
                            <div className="history-dates-circle__dates">
                                <HistoryDatesChange
                                    newNumber={activeCategoryData.firstDate}
                                    color="rgb(93, 95, 239)"
                                />
                                <HistoryDatesChange
                                    newNumber={activeCategoryData.lastDate}
                                    color="rgb(239, 93, 168)"
                                />
                            </div>
                            <div className="history-dates__line history-dates__circle-horizontal-line"></div>
                            <div className="history-dates-circle__figure"></div>
                            <div
                                className="history-dates-circle__figure-container"
                                style={{
                                    transform: `rotate(${rotation}deg)`
                                }}
                            >
                                {historyDatesList.map((category, index) => {
                                    const position = getItemPosition(index);
                                    const isActive = index === activeCategory;

                                    return (
                                        <div
                                            key={category.id}
                                            className={`history-dates-circle__figure-item${isActive ? "--active" : ""}`}
                                            style={{
                                                transform: `translate(${position.x}px, ${position.y}px) rotate(${-rotation}deg)`
                                            }}
                                            onClick={() =>
                                                handleItemClick(index)
                                            }
                                        >
                                            <div className="history-dates-circle__figure-item-number">
                                                {index + 1}
                                            </div>
                                            <span className="history-dates-circle__figure-item-text">
                                                {category.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="history-dates__circle-control">
                        <div className="history-dates__circle-control-amount">
                            {(activeCategory + 1).toString().padStart(2, "0") +
                                "/" +
                                historyDatesList.length
                                    .toString()
                                    .padStart(2, "0")}
                        </div>
                        <div className="history-dates__circle-control-btns">
                            <button
                                className={`history-dates__circle-control-btn${
                                    activeCategory === 0 ? "--disabled" : ""
                                } history-dates__circle-control-prev-btn`}
                                disabled={activeCategory === 0}
                                onClick={() =>
                                    handleItemClick(activeCategory - 1)
                                }
                            ></button>
                            <button
                                className={`history-dates__circle-control-btn${
                                    activeCategory ===
                                    historyDatesList.length - 1
                                        ? "--disabled"
                                        : ""
                                } history-dates__circle-control-next-btn`}
                                disabled={
                                    activeCategory ===
                                    historyDatesList.length - 1
                                }
                                onClick={() =>
                                    handleItemClick(activeCategory + 1)
                                }
                            ></button>
                        </div>
                    </div>
                    <div className="history-dates__mobile-pointers">
                        {historyDatesList.map((category, index) => {
                            const isActive = index === activeCategory;
                            return (
                                <div
                                    className={`history-dates__mobile-pointer${isActive ? "--active" : ""}`}
                                    onClick={() => setActiveCategory(index)}
                                    key={category.id}
                                ></div>
                            );
                        })}
                    </div>
                    <div className="history-dates__circle-dates">
                        <HistoryDatesSlider
                            activeCategoryData={activeCategoryData}
                            activeCategory={activeCategory}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
