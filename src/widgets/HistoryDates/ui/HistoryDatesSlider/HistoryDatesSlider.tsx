import { useEffect, useRef, useState } from "react";
import "./historyDatesSlider.scss";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IHistoryDates } from "../../types/historyDate";

interface IProps {
    activeCategory: number;
    activeCategoryData: IHistoryDates;
}

export default function HistoryDatesSlider({
    activeCategoryData,
    activeCategory
}: IProps) {
    const [isBeginning, setIsBeginning] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const sliderRef = useRef<SwiperRef>(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.swiper.update();
            sliderRef.current.swiper.slideTo(0);
            updateNavigationState(sliderRef.current.swiper);
        }
    }, [activeCategoryData]);

    const updateNavigationState = (swiper: SwiperClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <div className="history-date-slider" key={activeCategory}>
            <Swiper
                ref={sliderRef}
                slidesPerView={"auto"}
                modules={[Pagination, Navigation]}
                slidesPerGroup={1}
                navigation={{
                    nextEl: ".history-date-slider__next-btn",
                    prevEl: ".history-date-slider__prev-btn"
                }}
                onSlideChange={updateNavigationState}
                onResize={updateNavigationState}
                onTouchEnd={updateNavigationState}
                className="history-date-slider__content"
            >
                {activeCategoryData.dates.map(date => (
                    <SwiperSlide
                        className="history-date-slider__slide"
                        key={date.id}
                    >
                        <div className="history-date-slider__slide-content">
                            <div className="history-date-slider__slide-name">
                                {date.title}
                            </div>
                            <p className="history-date-slider__slide-text">
                                {date.text}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button
                className={`history-date-slider__btn${isBeginning ? "--hidden" : ""} history-date-slider__prev-btn`}
                onClick={() => updateNavigationState(sliderRef.current!.swiper)}
            ></button>
            <button
                className={`history-date-slider__btn${isEnd ? "--hidden" : ""} history-date-slider__next-btn`}
                onClick={() => updateNavigationState(sliderRef.current!.swiper)}
            ></button>
        </div>
    );
}
