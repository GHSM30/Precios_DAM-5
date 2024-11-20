import React, { useState, useEffect } from "react";
// Importar componentes (asegúrate de que estos existen o crear versiones correspondientes)
import PricesNavTab from "../components/tabs/PricesNavTab.jsx";
import WholesaleTab from "../components/tabs/WholesaleTab.jsx";
import RetailTab from "../components/tabs/RetailTab.jsx";
import { getAllPrices } from "../components/services/remote/get/GetAllPrices.jsx"; // Asegúrate de tener esta función creada
import AddPriceModal from "../components/modals/AddPriceModal";

const Prices = () => {
    // Estado para controlar la pestaña seleccionada (mayoreo o menudeo)
    const [currentTabInPrices, setCurrentTabInPrices] = useState("WHOLESALE");

    // Estado para almacenar los precios
    const [prices, setPrices] = useState([]);

    // Estado para controlar la visibilidad del modal de agregar precios
    const [addPriceShowModal, setAddPriceShowModal] = useState(false);

    // Función para obtener los precios
    const fetchPrices = async () => {
        try {
            const data = await getAllPrices(); // Llamada a la función de servicio
            setPrices(data);
        } catch (error) {
            console.error("Error al obtener los precios:", error);
        }
    };

    // Efecto que se ejecuta al cargar el componente para obtener los precios
    useEffect(() => {
        fetchPrices();
    }, []);

    // Función para manejar el evento después de agregar un precio
    const handlePriceAdded = () => {
        fetchPrices(); // Actualizar la lista de precios
        setAddPriceShowModal(false); // Cerrar el modal
    };

    return (
        <div>
            <PricesNavTab setCurrentTabInPrices={setCurrentTabInPrices} />

            {currentTabInPrices === "WHOLESALE" && (
                <WholesaleTab prices={prices} /> // Pasar los precios al componente de mayoreo
            )}

            {currentTabInPrices === "RETAIL" && (
                <RetailTab prices={prices} /> // Pasar los precios al componente de menudeo
            )}

            {/* Modal para agregar un nuevo precio */}
            <AddPriceModal
                addPriceShowModal={addPriceShowModal}
                setAddPriceShowModal={setAddPriceShowModal}
                onPriceAdded={handlePriceAdded} // Pasamos la función para actualizar la lista
            />
        </div>
    );
};

export default Prices;
