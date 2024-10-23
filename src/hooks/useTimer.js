import { useEffect, useState } from "react";
import { getTimeValues } from "../utils/common.service";

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDifference = countDownDate - new Date().getTime();
      if (timeDifference > 0) setCountDown(timeDifference);
    }, 1000);
    return () => clearInterval(interval);
  }, [countDownDate]);

  return getTimeValues(countDown);
};

const useTimeAgo = (targetDate) => {
  const countUpDate = new Date(targetDate).getTime();
  const [countUp, setCountUp] = useState(new Date().getTime() - countUpDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountUp(new Date().getTime() - countUpDate);
    }, 60000);

    return () => clearInterval(interval);
  }, [countUpDate]);
  return getTimeValues(countUp);
};

export { useCountdown, useTimeAgo };
