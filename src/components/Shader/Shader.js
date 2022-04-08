import './Shader.css';

import { useSelector } from 'react-redux';
import { selectIsModal } from '../../features/generalSlice';

export const Shader = () => {
    return useSelector(selectIsModal) ? <div id="Shader"></div> : null;
}