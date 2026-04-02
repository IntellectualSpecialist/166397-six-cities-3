import { SortingOption } from '../../const';
import { SortingOptionType } from '../../types/sorting-option-type';

type SortingProps = {
  currentOption: SortingOptionType;
  isOpen: boolean;
  onSortingClick?: () => void;
  onSortingOptionClick?: (option: SortingOptionType) => void;
}

const Sorting = ({currentOption = SortingOption[0], isOpen, onSortingClick, onSortingOptionClick}: SortingProps): JSX.Element => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by{' '}</span>
    <span className="places__sorting-type" tabIndex={0} onClick={onSortingClick}>
      {currentOption}
      <svg className="places__sorting-arrow" width={7} height={4}>
        <use xlinkHref="#icon-arrow-select" />
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${isOpen && 'places__options--opened'}`}>
      {SortingOption?.length && SortingOption.map((option) => (
        <li
          key={option}
          className={`places__option ${option === currentOption ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick = {() => onSortingOptionClick?.(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  </form>
);

export default Sorting;
