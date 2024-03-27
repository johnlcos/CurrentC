interface DropDownProps {
  menu: string[];
}

export const DropDown = ({ menu }: DropDownProps) => {
  return (
    <div className='text-[#E4E6EB] z-11'>
      <ul>
        {menu.map((menuItem, index) => (
          <li key={menuItem}>{menuItem}</li>
        ))}
      </ul>
    </div>
  );
};
