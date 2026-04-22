import { useState, useEffect } from 'react';
import { isEscKey } from '../../utils/common';
import { SortingOption } from '../../const';
import { SortingOptionType } from '../../types/sorting-option-type';

type SortingProps = {
  currentOption: SortingOptionType;
  onSortingOptionClick?: (option: SortingOptionType) => void;
}

const Sorting = ({ currentOption, onSortingOptionClick }: SortingProps): JSX.Element => {
  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false);

  const handleSortingOptionClick = (option: SortingOptionType): void => {
    onSortingOptionClick?.(option);
    setIsSortingOpen(false);
  };

  useEffect(() => {
    if (isSortingOpen) {
      const onDocumentKeydown = (evt: KeyboardEvent) => {
        if (isEscKey(evt)) {
          evt.preventDefault();
          setIsSortingOpen(false);
        }
      };

      document.addEventListener('keydown', onDocumentKeydown);

      return () => {
        document.removeEventListener('keydown', onDocumentKeydown);
      };
    }
  }, [isSortingOpen]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by{' '}</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsSortingOpen((prev) => !prev)} data-testid="sorting-type">
        {currentOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortingOpen ? 'places__options--opened' : ''}`} data-testid="list">
        {SortingOption?.length && SortingOption.map((option) => (
          <li
            key={option}
            className={`places__option ${option === currentOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick = {() => handleSortingOptionClick(option)}
            data-testid={option}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Sorting;
