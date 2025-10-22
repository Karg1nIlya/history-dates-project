import { useEffect, useState } from "react";
import "./historyDates.scss";
// import "./historyDates2.scss";
import { historyDatesList } from "../../constants/historyDatesList";

export default function HistoryDates() {
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [rotation, setRotation] = useState<number>(0);
    const [activeDateIndex, setActiveDateIndex] = useState<number>(0);

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
        setActiveDateIndex(0); // Сбрасываем к первой дате при смене категории
    };

    // Смена даты внутри активной категории
    const handleDateChange = (direction: "prev" | "next") => {
        const currentDates = historyDatesList[activeCategory].dates;
        let newIndex;

        if (direction === "next") {
            newIndex = (activeDateIndex + 1) % currentDates.length;
        } else {
            newIndex =
                (activeDateIndex - 1 + currentDates.length) %
                currentDates.length;
        }

        setActiveDateIndex(newIndex);
    };

    const activeCategoryData = historyDatesList[activeCategory];
    const activeDate = activeCategoryData?.dates[activeDateIndex];

    return (
        <div className="circle-timeline">
            {/* Центральный круг с информацией */}
            <div className="circle-center">
                {/* <div className="category-info">
                    <h2 className="category-title">
                        {activeCategoryData?.title}
                    </h2>
                    <div className="date-info">
                        <h3 className="date-year">{activeDate?.title}</h3>
                        <p className="date-text">{activeDate?.text}</p>
                    </div>
                    <div className="date-navigation">
                        <button
                            className="nav-button"
                            onClick={() => handleDateChange("prev")}
                        >
                            ‹
                        </button>
                        <span className="date-counter">
                            {activeDateIndex + 1} /{" "}
                            {activeCategoryData?.dates.length}
                        </span>
                        <button
                            className="nav-button"
                            onClick={() => handleDateChange("next")}
                        >
                            ›
                        </button>
                    </div>
                </div> */}
            </div>

            {/* Вращающийся круг с элементами */}
            <div
                className="circle-container"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {historyDatesList.map((category, index) => {
                    const position = getItemPosition(index);
                    const isActive = index === activeCategory;

                    return (
                        <div
                            key={category.id}
                            className={`circle-item ${isActive ? "active" : ""}`}
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) rotate(${-rotation}deg)`
                            }}
                            onClick={() => handleItemClick(index)}
                        >
                            <div className="item-content">
                                <span className="item-title">
                                    {category.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Навигационные точки */}
            <div className="navigation-dots">
                {historyDatesList.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === activeCategory ? "active" : ""}`}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};
