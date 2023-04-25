import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Person from "./components/Persons";
import phoneBook from "./services/phoneBook";
import Notification from "./components/Notification"

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [message, setMesagge] = useState("");
    const [messageType, setMesaggeType] = useState("");

    useEffect(() => {
        phoneBook.getAll().then((allPersons) => {
            setPersons(allPersons);
        });
    }, []);

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleFilterChange = (e) => {
        setNewFilter(e.target.value);
    };

    const resetForm = () => {
        setNewName("");
        setNewNumber("");
    };

    const resetMessage = () => {
        setTimeout(() => {
            setMesagge(null);
            setMesaggeType(null);
        }, 5000);
    };

    const addPerson = (e) => {
        e.preventDefault();

        const personObject = {
            name: newName,
            number: newNumber,
        };

        const existing_names = persons.map((person) => person.name);

        if (existing_names.includes(newName)) {
            const msg = `${newName} is already added to the phonebook. Replace the old number with the new one?`;
            if (window.confirm(msg)) {
                updatePerson(personObject);
            }
        } else {
            phoneBook
                .create(personObject)
                .then((newPerson) => {
                    setPersons(persons.concat(newPerson));
                    setMesagge(`Add success ${newPerson.name}`);
                    setMesaggeType("success");
                    resetMessage();
                    resetForm();
                    
                })
        }
    };

    const updatePerson = (personObject) => {
        const personUpdate = persons.find(
            (person) => person.name === personObject.name
        );
        phoneBook
            .update(personUpdate.id, personObject)
            .then((returnedPerson) => {
                setPersons(
                    persons.map((person) =>
                        person.id !== personUpdate.id ? person : returnedPerson
                    )
                );
                resetForm();
            })
            .then(() => {
                setMesagge(`Update success ${personUpdate.name}`);
                setMesaggeType("success");
                resetMessage();
            });
    };

    const deletePerson = (arr) => {
        const msg = `Delete ${arr.name}?`;
        const confirm = window.confirm(msg);
        if (confirm) {
            phoneBook
                .deleted(arr.id)
                .then((persons) =>
                    setPersons(persons.filter((person) => person.id !== arr.id))
                )
                .then(() => {
                    setMesagge(`Delete success ${arr.name}`);
                    setMesaggeType("success");
                    resetMessage();
                });
        }
    };

    const personsToShow = newFilter
        ? persons.filter((person) =>
                person.name.toLowerCase().includes(newFilter.toLowerCase())
            )
        : persons;

    return (
        <div>
            <h2>Numberbook</h2>
            <Notification message={message} messageType={messageType} />
            <Filter newFilter={newFilter} action={handleFilterChange} />
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    Name
                    <input
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                    />
                    Number
                    <input
                        type="text"
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map((person) => (
                    <Person
                        key={person.name}
                        person={person}
                        deleted={() => deletePerson(person)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;
