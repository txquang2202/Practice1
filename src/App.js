import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Duy",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Phu",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "An",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onclick }) {
  return (
    <button className="button" onClick={onclick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function closing() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  function handleSelect(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelect}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {!showAddFriend ? (
          <Button onclick={closing}>Thêm bạn bè</Button>
        ) : (
          <Button onclick={closing}>Đóng</Button>
        )}
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
function Friend({ friend, onSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          Bạn nợ {friend.name} {Math.abs(friend.balance)} VND
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} nợ bạn {Math.abs(friend.balance)} VND
        </p>
      )}
      {friend.balance === 0 && <p>Bạn và {friend.name} huề nhau</p>}
      <Button onclick={() => onSelect(friend)}>
        {isSelected ? "Đóng" : "Chọn"}
      </Button>
    </li>
  );
}

function FriendsList({ friends, onSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          selectedFriend={selectedFriend}
          friend={friend}
          onSelect={onSelect}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) {
      alert("Xin hãy nhập đầy đủ tên và hình ảnh");
      return;
    }
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Tên</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🧑‍🤝‍🧑Link Avatar</label>
      <input
        type="text "
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Thêm</Button>
    </form>
  );
}
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidBy, setpaidBy] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidBy : "";
  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidBy) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidBy);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Chia tiền với {selectedFriend.name}</h2>
      <label>💰 Số tiền</label>
      <input
        type="text "
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>Bạn đã trả</label>
      <input
        type="text "
        value={paidBy}
        onChange={(e) =>
          setpaidBy(
            Number(e.target.value) > bill ? paidBy : Number(e.target.value)
          )
        }
      />
      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s đã trả</label>

      <input type="text " disabled value={paidByFriend} />
      <label>Ai là người trả ?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">Bạn</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Chia tiền</Button>
    </form>
  );
}
