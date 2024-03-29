import { useSortable } from "@dnd-kit/sortable"
import PropTypes from 'prop-types'
import {CSS} from '@dnd-kit/utilities'

export default function Task({id, title}) {
    const{attributes, listeners, setNodeRef, transform, transition}= useSortable({id})

    const style={
        transition,
        transform:CSS.Transform.toString(transform),
    }
  
    return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='bg-red-100 m-2 p-2'>
        {/* <input type='checkbox' className=''/>     */}
        {title}
    </div>
  )
}

Task.propTypes={
    id: PropTypes.any,
    title:PropTypes.string
}