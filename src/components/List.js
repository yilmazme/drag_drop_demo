import { useState } from "react";
import Users from "../data/Data"
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';



export default function List(){

    const [characters, setCharacters] = useState(Users);
    const [userState, setUserState] = useState("User's info will be displayed here when you drag one.");
    const [dragState, setDragState] = useState(false);


    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const users = Array.from(characters);
        const [reorderedItem] = users.splice(result.source.index, 1);
        users.splice(result.destination.index, 0, reorderedItem);

        setCharacters(users);
        console.log(users)
        setDragState(false);       
        setUserState("User's info will be displayed here when you drag one.");
    }

    function handleOnDragStart(result){
        Users.filter(user=>user.id === result.draggableId).map(elem=>setUserState(JSON.stringify(elem)));
        setDragState(true);
        console.log(characters)
    }

    return(
        <div className="grid grid-cols-3 gap-4 p-4 h-full" >
            <div className={ dragState===true?  "bg-gray-300 col-span-1 p-4 h-full border-2 border-gray-100 rounded" :
              "bg-gray-200 col-span-1 p-4 h-full  border-2 border-gray-100 rounded"}>
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
                                                className="h-12  bg-blue-800 text-white m-2 align-middle pt-2 rounded flex"
                                            >
                                                <span className="w-4/12"></span>
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
           <div className="col-span-2 text-left border-2 border-gray-100 p-5 h-full text-lg relative">{userState}
           <p className="absolute bottom-0 left-1 text-xs ">
               <b>NOT: </b> Sürüklenen kartın mı, kartların o anki sıralamasının mı JSON hali isteniyor bilemedim.<br/>
            2.defa mail atmak istemedim. Kartların o anki sıralaması console'da görülebilir, ekrana yansıtmadım.</p>
           </div>
        </div>

    )
}