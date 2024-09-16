import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import {
    increment,
    incrementByAmount,
    getImages,
} from '../state/gallery/gallerySlice'

const Gallery = () => {
    const gallery = useSelector((state: RootState) => state.gallery.value)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            {gallery}
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
            <button onClick={() => dispatch(getImages(10))}>+10async</button>
        </div>
    )
}

export default Gallery
