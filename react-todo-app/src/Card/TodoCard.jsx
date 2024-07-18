import { CiCircleCheck } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";

import styled from "styled-components";

export function TodoCard({
  title,
  done,
  id,
  setTodos,
  category,
  date,
  filteredTodos,
  setFilteredTodos,
  todos,
}) {
  const { catId } = useParams();
  const [edit, setEdit] = useState(false);
  const updateTitleRef = useRef();
  const currentTitleRef = useRef();

  //setCatId([useParams()]);
  //console.log(catId);

  //Rückgabe aller Todo außer, wenn der filter todo.id !== id;
  //(die id des iterierten todos ist genau die des angeklickten,
  // dann nicht zurückgeben) nicht zutrifft
  function handleDeleteOnClick() {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
    //items to be deleted:
    todos.map((todo) => {
      if (todo.id === id) {
        const deleteTodoID = todo.id;

        const deleteTodoEvent = new CustomEvent("deleteTodo", {
          detail: deleteTodoID,
        });
        window.dispatchEvent(deleteTodoEvent);
        // console.log(`Event send with id: ${deleteTodoID}`);
      }
    });

    setFilteredTodos(
      filteredTodos.filter((todo) => {
        return todo.id !== id;
      })
    );
  }
  function handleToggleEdit() {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }

  function handleUpdateTitle() {
    /* setTodos(
      todos.map((todo) => {
        if (todo.id === id && updateTitleRef.current.value != "") {
          todo.title = updateTitleRef.current.value;
        }
        return todo;
      })
    ); */

    todos.map((todo) => {
      if (todo.id === id && updateTitleRef.current.value != "") {
        const updateTitleObj = {
          id: id,
          title: updateTitleRef.current.value.toLowerCase(),
        };
        const updateTitleEvent = new CustomEvent("updateTitle", {
          detail: updateTitleObj,
        });
        window.dispatchEvent(updateTitleEvent);
      }
    });

    updateTitleRef.current.value = "";
    setEdit(false);
  }

  //die Callbackfunktion iteriert über die todos vergleicht die id
  //des iterierten Todo mit der des angeklickten todos und invertiert
  //den boolean wert von 'done' property. Zuletzt setzt der setter (setTodos)
  //den Zustand der Todos auf den neuen Wert (die Todos aber
  //mit dem einem Todo property 'done' auf den anderen Wert (bei true -> false)
  function handleToggleOnClick() {
    /*     setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      })
    ); */
    //items for toggling:
    todos.map((todo) => {
      if (todo.id === id) {
        const toggleID = todo.id;
        // console.log(`ID to be toggled: ${toggleID}`);

        /*     const deleteTodoEvent = new CustomEvent("deleteTodo", {
          detail: deleteTodoID,
        }); */

        const toggleTodoEvent = new CustomEvent("toggleTodo", {
          detail: toggleID,
        });
        window.dispatchEvent(toggleTodoEvent);
      }
    });
  }

  if (catId) {
    return (
      // Übergebe Styled Element property
      //Link zu todocard
      todos.map((todo) => {
        if (todo.id === catId)
          return (
            <StyledTodoContainer done={todo.done}>
              <TodoText done={todo.done}>{todo.title}</TodoText> - (
              {todo.category}) - ({date})
              <CiCircleCheck onClick={handleToggleOnClick} />
              <FaRegTrashAlt onClick={handleDeleteOnClick} />
            </StyledTodoContainer>
          );
      })
    );
  }

  if (!edit) {
    return (
      <StyledTodoContainer done={done}>
        <TodoText done={done} onClick={handleToggleEdit} ref={currentTitleRef}>
          {title}
        </TodoText>{" "}
        - ({category}) - ({date})
        <CiCircleCheck onClick={handleToggleOnClick} />
        <FaRegTrashAlt onClick={handleDeleteOnClick} />
      </StyledTodoContainer>
    );
  } else {
    return (
      <StyledTodoContainer>
        <input
          type="text"
          name="editText"
          id="editText"
          ref={updateTitleRef}
          placeholder="Change Title..."
          required></input>
        <button type="submit" onClick={handleUpdateTitle}>
          Submit
        </button>
        <button onClick={handleToggleEdit}>Cancel</button>
      </StyledTodoContainer>
    );
  }
}

const TodoText = styled.p`
  display: inline;
  text-decoration-line: ${(props) => (props.done ? "line-through" : "none")};
`;

//Einem Styled Element kann man auch JS Code übergeben
//Hier wird einem anynonyme Funktion aufgerufen, welches auf das props Argument
//zugreift und per tenary operator den CSS - Wert setzt
const StyledTodoContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  background-color: #3f72af;
  color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
  color: ${(props) => (props.done ? "grey" : "white")};
`;
