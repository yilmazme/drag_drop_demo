import { useState } from "react";
import Users from "../data/Data"
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';

import "./List.css"


export default function List(){

    const [characters, setCharacters] = useState(Users);
    const [userState, setUserState] = useState("");
    const [dragState, setDragState] = useState(false);


    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const users = Array.from(characters);
        const [reorderedItem] = users.splice(result.source.index, 1);
        users.splice(result.destination.index, 0, reorderedItem);

        setCharacters(users);
        setUserState("");
        setDragState(false);
        console.log(result);
    }

    function handleOnDragStart(result){
        Users.filter(user=>user.id === result.draggableId).map(elem=>setUserState(JSON.stringify(elem)));
        setDragState(true);
        console.log(result.draggableId)
    }

    return(
        <div className="grid grid-cols-3 gap-4 p-4 h-full" >
            <div className={ dragState===true?  "bg-gray-300 col-span-1 p-4 h-full border-2 border-gray-100" :
              "bg-gray-400 col-span-1 p-4 h-full  border-2 border-gray-100"}>
            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
                <Droppable droppableId="characters">

                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className="p-1 ">

                            {characters.map(({ id, name, department }, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <li ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="h-12 text-center bg-blue-800 text-white m-2 align-middle pt-2 "
                                            >
                                              <p className="align-middle">{name}</p>  
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ul>
                    )}

                </Droppable>

            </DragDropContext>
            </div>
           <div className="col-span-2 text-left border-2 border-gray-100 p-5 h-full text-lg">{userState===""? "User's info will be displayed here when you drag one.":userState}</div>
        </div>

    )
}