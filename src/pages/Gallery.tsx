import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { increment, incrementByAmount } from '../state/gallery/gallerySlice'

const Gallery = () => {
    const gallery = useSelector((state: RootState) => state.gallery.value)
    const dispatch = useDispatch()

    return (
        <div>
            {gallery}
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
        </div>
    )
}

export default Gallery
