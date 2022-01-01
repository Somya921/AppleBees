import React, {useState} from 'react';
import { setLocalStorage } from './localStorage'
import { getLocalStorage } from './localStorage'

// Bootstrap for react
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

function UpdateToDoList(inputText, todoList) {
    
    if (inputText !== ''){
        const newVal ={
            id : Math.random(),
            value : inputText,
            status : "Pending"
        };
        var currList = todoList;
        currList.push(newVal);
        //console.log('I was triggered during update', currList);
        setLocalStorage ("todoList", currList);
        return currList;
    }
}

function DeleteFromToDoList(key, todoList) {
    
    var currList = todoList.filter(item => item.id !== key);
    //console.log('I was triggered during delete', currList);
    setLocalStorage ("todoList", currList);
    return currList;
}

function ChangeToDoList(key, todoList, updateText) {
    
    if (updateText === "") {return todoList;}
    const currList = todoList.map((item) => {
        if (item.id === key) {
            const updatedItem = {
                id : item.id,
                value : updateText,
                status : item.status
            };
            return updatedItem;
          }
          return item;
    });
    //console.log('I was triggered during change to list', currList);
    setLocalStorage ("todoList", currList);
    return currList;
}

function UpdateStatus(key, todoList) {
    
   const currList = todoList.map((item) => {
        if (item.id === key) {
            const updatedItem = {
                id : item.id,
                value : item.value,
                status : (item.status === "Pending" ? "Completed" : "Pending")  
            };
            return updatedItem;
          }
        return item;
    });
    //console.log('I was triggered during update to list', currList);
    setLocalStorage ("todoList", currList);
    return currList;
}

function App () {

    const [inputText, UpdateInputText] = useState("");
    const [todoList, UpdateList] = useState(getLocalStorage("todoList"));
    
    let deleteAllLink;
        deleteAllLink = (<a href="#" style= {delLinkStyle} 
                            onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Do you really want to delete the entire List?"
                                        );
                                        if (confirmBox === true) {
                                                UpdateList([]);
                                                setLocalStorage ("todoList", []);
                                                UpdateInputText("");}}}>
                               Delete All
                              
                        </a>)
        
    let itemsToRender;  
    if (todoList) {
    itemsToRender = todoList.map(item => {
      return <ListGroup.Item variant="dark" action key={item.id}>
              <table>
              <tbody>
                <tr style={{backgroundColor: item.status === "Pending" ? "":"grey"}}>
                    <td style={{width: "85%"}}>
                      {item.value}
                    </td>
                    <td style={{width: "5%"}}>
                        <a title="Delete!" href="#" 
                            onClick={(e) => {UpdateList(DeleteFromToDoList(item.id,todoList));
                                                                     e.preventDefault();}}>
                          Del
                          </a>
                    </td>
                    <td style={{width: "5%"}}>
                        <a title="Update to what we have in Input Box!" href="#" 
                            onClick={(e) => { if (inputText === "" || inputText.trim() === 0) {
                                                const confirmBox = window.confirm(
                                                "Please enter text in text box and then hit Upd on the row you want to change"
                                                );}
                                            else {
                                                UpdateList(ChangeToDoList(item.id,todoList,inputText));
                                                        UpdateInputText("");
                                                        e.preventDefault();}}}>
                         Upd    
                         </a>
                    </td>
                    <td style={{width: "5%"}}>
                        <a title="Update to what we have in Input Box!" href="#" 
                            onClick={(e) => { UpdateList(UpdateStatus(item.id,todoList));
                                                                        e.preventDefault();}}>
                         {item.status}
                        </a>
                     </td>
                </tr>
               </tbody>
               </table>
            </ListGroup.Item>;
        });
    }
    
    //Main render starts here
    return(<Container><Row style={todoListStyle}>
				TODO LIST
			</Row>
                        <hr/>
    <Row>
     <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
            <FormControl
            placeholder={todoList && todoList.length > 0 ? 
                        "Upd: update to whats in the textbox , Del: Delete..Or Add :)":"add item . . . "}
            size="md"
            value = {inputText}
            onChange = {(e) => {UpdateInputText(e.target.value);}}
            aria-label="add something"
            aria-describedby="basic-addon2"/>
            <InputGroup>
			<Button style={btnStyle}	
			onClick={() => {UpdateList(UpdateToDoList(inputText,todoList));
                                        UpdateInputText("");}}>
			ADD
			</Button>                  
            </InputGroup>
            </InputGroup>
            <div style={{paddingBottom : "20px" , 
                visibility : todoList && todoList.length > 0 ? "visible" : "hidden"}}>
            {deleteAllLink}
            </div>
     </Col>
    </Row>
    <Row>
     <Col md={{ span: 10, offset: 2 }}>
        <ListGroup>{itemsToRender}</ListGroup>
     </Col>
   </Row>
 </Container>
);
}

//Styles
const btnStyle = {
    backgroundColor:"grey",
    span: "5", 
    offset: "4",
    left : "40%",
    top:"10%",
    borderRadius: "4px"
};

const delLinkStyle = {
    paddingLeft : "39%",
    top:"5%"
};

const todoListStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    fontWeight: "bolder"
};




export default App;
