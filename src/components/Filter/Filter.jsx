//Налаштуваня компоненту Filter
import React from 'react';
import { FilterInput, FilterLabel } from './Filter.styled';
//Імпортуємо хукі
import { useDispatch, useSelector } from 'react-redux';
// Імпортуємо генератор екшену
import { setFilter } from '../../redux/filterSlice';
// Імпортуємо селектор
import { getFilter } from '../../redux/selectors';

const Filter = () => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();

  const changeFilter = e => {
    // Викликаємо генератор екшену та передаємо текст завдання для поля payload
    // Відправляємо результат – екшен створення фільтру
    dispatch(setFilter(e.currentTarget.value));
  };

  //Забираємо дані зі глобального стора фільру
  const filterValue = useSelector(getFilter);

  return (
    <FilterLabel htmlFor="">
      Find contacs by name
      <FilterInput type="text" value={filterValue} onChange={changeFilter} />
    </FilterLabel>
  );
};

export default Filter;
