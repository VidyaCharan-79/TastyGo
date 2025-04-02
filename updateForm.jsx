import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const [isEditing, setIsEditing] = useState(false);
const [currentFood, setCurrentFood] = useState({ Name: '', Price: '', id: '' });


const updateFood = async () => {
  const foodDoc = doc(db, "Food", currentFood.id);
  await updateDoc(foodDoc, {
    Name: currentFood.Name,
    Price: currentFood.Price,
  });
  setIsEditing(false);
  fetchFood(); 
};

const handleUpdateClick = (item) => {
  setIsEditing(true);
  setCurrentFood(item); 
};
<button onClick={() => handleUpdateClick(item)}>Update</button>
 {isEditing && (
    <div>
      <h2>Edit Food Item</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={currentFood.Name}   
          onChange={(e) => setCurrentFood({ ...currentFood, Name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={currentFood.Price} 
          onChange={(e) => setCurrentFood({ ...currentFood, Price: e.target.value })}
        />
        <button type="button" onClick={updateFood}>Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    </div>
  )}




