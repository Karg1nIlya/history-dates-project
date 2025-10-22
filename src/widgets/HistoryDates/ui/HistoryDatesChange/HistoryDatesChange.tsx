import { useEffect, useRef, useState } from "react";
import "./historyDatesChange.scss";

interface IProps {
    newNumber: number;
    color: "rgb(93, 95, 239)" | "rgb(239, 93, 168)";
}

export default function HistoryDatesChange({ newNumber, color }: IProps) {
    const [number, setNumber] = useState(newNumber);
    const intervalRef = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        const addingPart = number > newNumber ? -1 : 1;
        const animationTime = 800 / Math.abs(number - newNumber);
        intervalRef.current = setInterval(() => {
            setNumber(prev => prev + addingPart);
        }, animationTime);

        return () => clearInterval(intervalRef.current);
    }, [newNumber]);

    useEffect(() => {
        if (number === newNumber) {
            clearInterval(intervalRef.current);
        }
    }, [number]);

    return (
        <div className="history-dates-change" style={{ color: `${color}` }}>
            {number}
        </div>
    );
}
