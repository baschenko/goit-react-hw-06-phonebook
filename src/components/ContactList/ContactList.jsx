// Налаштування компоненту ContactList
import React from 'react';
import { ContactButton, ContactItem, List } from './ContactList.styled';
// Імпортуємо хукі
import { useDispatch, useSelector } from 'react-redux';
// Імпортуємо селектори
import { getContacts, getFilter } from '../../redux/selectors';
// Імпортуємо генератор екшену
import { deleteContact } from '../../redux/contactSlice';

const ContactList = () => {
  // Забираємо дані зі глобального стора список контактів
  const contacts = useSelector(getContacts);
  // Забираємо дані зі глобального стора фільру
  const filterValue = useSelector(getFilter);

  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();

  // Декларуємо функцію для фільтруванні список
  const getVisibleContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Формуємо відфільтрований список
  const visibleContact = getVisibleContacts();

  return (
    <List>
      {visibleContact.map(({ id, name, number }) => (
        <ContactItem key={id}>
          {name} - {number}
          <ContactButton onClick={() => dispatch(deleteContact(id))}>
            Delete
          </ContactButton>
        </ContactItem>
      ))}
    </List>
  );
};

export default ContactList;
