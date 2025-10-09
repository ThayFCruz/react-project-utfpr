function CharacterItem({ character }) {
  return (
    <li
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "8px",
      }}

      className="character-item"
    >
      <img src={character.image}/>
      <div className="character-info">
        <h4>Nome: {character.name}</h4>
        <p><strong>Genêro:</strong> {character.gender}</p>
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Origen:</strong> {character.origin.name}</p>
        <p><strong>Localização Atual: </strong>{character.location.name}</p>
      </div>
      
    </li>
  );
}

export default CharacterItem;
