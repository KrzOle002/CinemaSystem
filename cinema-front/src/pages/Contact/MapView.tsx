import styled from "styled-components";
import contactMap from "../../assets/contact-map.png";

const MapContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
`;

const MapImage = styled.img`
  width: 100%;
  height: auto;
`;

const MapView = () => {
  return (
    <MapContainer>
      <MapImage src={contactMap} alt="Mapa" />
    </MapContainer>
  );
};

export default MapView;
