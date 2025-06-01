import { useNavigate } from "react-router-dom";
import { APP_PATH } from "../constants";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { setActiveScreen } from "../store/appSlice";

export const useGoToBack = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeScreen = useAppSelector((state) => state.app.activeScreen);

  const goToBack = () => {
    switch (activeScreen) {
      case APP_PATH.DISTRICT:
        dispatch(setActiveScreen(APP_PATH.STATE));
        break;
      case APP_PATH.CATEGORY:
        dispatch(setActiveScreen(APP_PATH.DISTRICT));
        break;
      case APP_PATH.SUB_CATEGORY:
        dispatch(setActiveScreen(APP_PATH.CATEGORY));
        break;
      case APP_PATH.POST_DETAILS:
        dispatch(setActiveScreen(APP_PATH.SUB_CATEGORY));
        break;
      case APP_PATH.USER:
        dispatch(setActiveScreen(APP_PATH.POST_DETAILS));
        break;
      case APP_PATH.OTP:
        dispatch(setActiveScreen(APP_PATH.USER));
        break;
      default:
        navigate('/');
        break;
    }
  };

  return goToBack;
};
