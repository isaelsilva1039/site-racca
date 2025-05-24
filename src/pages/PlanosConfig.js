import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaStar,
  FaCrown,
  FaBolt,
  FaGem,
  FaHeart,
  FaShieldAlt,
  FaRocket,
  FaMedal,
  FaTrophy,
  FaSun,
  FaMoon,
  FaFire,
  FaFlag,
  FaBell,
  FaGlobe,
  FaGift,
  FaKey,
  FaLock,
  FaPuzzlePiece,
  FaSnowflake,
  FaUmbrella,
  FaChevronDown,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 20px auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 1s ease-out;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 1600px;
    padding: 20px;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 0.9rem;
    word-wrap: break-word;
  }

  th {
    background: #a100ff;
    color: #ffffff;
    font-weight: 600;
  }

  td {
    background: #f9f9f9;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    th,
    td {
      padding: 8px;
    }
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    th,
    td {
      padding: 6px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 12px;
  }
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 1rem;
    color: #333;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    label {
      font-size: 0.95rem;
    }
  }
  @media (max-width: 480px) {
    label {
      font-size: 0.9rem;
    }
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8a00e6;
    outline: none;
    box-shadow: 0 0 5px rgba(138, 0, 230, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8a00e6;
    outline: none;
    box-shadow: 0 0 5px rgba(138, 0, 230, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectedOption = styled.div`
  padding: 10px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #8a00e6;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #a100ff;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Option = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #f0eaff;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #a100ff;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8a00e6;
    outline: none;
    box-shadow: 0 0 5px rgba(138, 0, 230, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
    min-height: 80px;
  }
  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
    min-height: 70px;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: #a100ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  min-height: 44px;

  &:hover {
    background: #8a00e6;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.9rem;
  }
`;

const RemoveButton = styled.button`
  padding: 8px;
  background: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #c82333;
  }

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    padding: 5px;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 15px;
`;

const ExtraFidelityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExtraFidelityItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SpecialtyItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FidelityBaseContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const iconOptions = [
  { name: "FaStar", component: <FaStar /> },
  { name: "FaCrown", component: <FaCrown /> },
  { name: "FaBolt", component: <FaBolt /> },
  { name: "FaGem", component: <FaGem /> },
  { name: "FaHeart", component: <FaHeart /> },
  { name: "FaShieldAlt", component: <FaShieldAlt /> },
  { name: "FaRocket", component: <FaRocket /> },
  { name: "FaMedal", component: <FaMedal /> },
  { name: "FaTrophy", component: <FaTrophy /> },
  { name: "FaSun", component: <FaSun /> },
  { name: "FaMoon", component: <FaMoon /> },
  { name: "FaFire", component: <FaFire /> },
  { name: "FaFlag", component: <FaFlag /> },
  { name: "FaBell", component: <FaBell /> },
  { name: "FaGlobe", component: <FaGlobe /> },
  { name: "FaGift", component: <FaGift /> },
  { name: "FaKey", component: <FaKey /> },
  { name: "FaLock", component: <FaLock /> },
  { name: "FaPuzzlePiece", component: <FaPuzzlePiece /> },
  { name: "FaSnowflake", component: <FaSnowflake /> },
  { name: "FaUmbrella", component: <FaUmbrella /> },
];

const PlanosConfig = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [extraFidelities, setExtraFidelities] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          "https://racca.store/api/clientes/planos/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar planos");
        }

        const data = await response.json();
        const mappedPlans = data.map((plan) => ({
          id: plan.id,
          icon: "FaStar",
          nomePlano: plan.nome_plano,
          valor: parseFloat(plan.valor),
          fidelidade: plan.fidelidade || 0,
          descricao: plan.descricao,
          benefits: plan.beneficios || [],
          fidelidadesExtras: plan.fidelidades_extras || [],
          especialidades: plan.especialidades || [],
        }));
        setPlans(mappedPlans);
      } catch (error) {
        setError("Erro ao buscar planos: " + error.message);
      }
    };

    const fetchSpecialties = async () => {
      try {
        const response = await fetch(
          "https://racca.store/api/specialties/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar especialidades");
        }

        const data = await response.json();
        // Extract the data array and ensure it's an array
        setAvailableSpecialties(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        setError("Erro ao buscar especialidades: " + error.message);
      }
    };

    fetchPlans();
    fetchSpecialties();
  }, []);

  useEffect(() => {
    if (selectedPlan) {
      setBenefits(selectedPlan.benefits || []);
      setExtraFidelities(
        selectedPlan.fidelidadesExtras.map((f, index) => ({
          ...f,
          id: `fidelity-${index}-${Date.now()}`,
        })) || []
      );
      setSpecialties(
        selectedPlan.especialidades.map((s, index) => ({
          ...s,
          id: `specialty-${index}-${Date.now()}`,
        })) || []
      );
    } else if (isAddingPlan) {
      setBenefits([]);
      setExtraFidelities([]);
      setSpecialties([]);
    }
  }, [selectedPlan, isAddingPlan]);

  const handleAddPlan = () => {
    setSelectedPlan({
      id: null,
      icon: "FaStar",
      nomePlano: "",
      valor: 0,
      fidelidade: 0,
      descricao: "",
      benefits: [],
      fidelidadesExtras: [],
      especialidades: [],
    });
    setIsAddingPlan(true);
  };

  const handleEditPlan = async (plan) => {
    try {
      const response = await fetch(
        `https://racca.store/api/clientes/planos/${plan.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar plano");
      }

      const data = await response.json();
      setSelectedPlan({
        id: data.id,
        icon: plan.icon || "FaStar",
        nomePlano: data.nome_plano,
        valor: parseFloat(data.valor),
        fidelidade: data.fidelidade || 0,
        descricao: data.descricao,
        benefits: data.beneficios || [],
        fidelidadesExtras: data.fidelidades_extras || [],
        especialidades: data.especialidades || [],
      });
      setIsAddingPlan(false);
    } catch (error) {
      setError("Erro ao buscar plano: " + error.message);
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este plano?")) {
      try {
        const url = `https://racca.store/api/clientes/planos/delete/${id}`;
        console.log("Delete Request URL:", url);

        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const text = await response.text();
        if (!response.ok) {
          console.log("Delete Response Status:", response.status);
          console.log("Delete Response Text:", text);
          let errorMessage = `Erro ao deletar plano (Status: ${response.status})`;
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            errorMessage = `Servidor retornou HTML ou resposta inválida: ${text.substring(
              0,
              100
            )}...`;
          }
          throw new Error(errorMessage);
        }

        setPlans(plans.filter((p) => p.id !== id));
        setError(null);
      } catch (error) {
        setError("Erro ao deletar plano: " + error.message);
        console.error("Delete API Error:", error);
      }
    }
  };

  const handlePlanFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const valor = parseFloat(formData.get("valor"));
    const fidelidade = parseInt(formData.get("fidelidade")) || 0;

    if (isNaN(valor) || valor <= 0) {
      setError("Valor deve ser um número maior que 0");
      return;
    }

    const benefitsArray = [];
    formData.forEach((value, key) => {
      if (key.startsWith("benefits[")) {
        benefitsArray.push(value);
      }
    });

    const planData = {
      nomePlano: formData.get("nomePlano"),
      descricao: formData.get("descricao") || "",
      fidelidade,
      valor: valor.toFixed(2),
      fidelidadesExtras: extraFidelities.map((fidelity) => ({
        preco: parseFloat(fidelity.preco),
        periodo: fidelity.periodo,
      })),
      especialidades: specialties.map((specialty) => ({
        nome: specialty.nome,
        consultationCount: specialty.consultationCount,
      })),
      beneficios: benefitsArray.length > 0 ? benefitsArray : undefined,
    };

    try {
      const url = isAddingPlan
        ? "https://racca.store/api/clientes/planos/create"
        : `https://racca.store/api/clientes/planos/update/${selectedPlan.id}`;
      const method = isAddingPlan ? "POST" : "PUT";

      console.log("Request URL:", url);
      console.log("Request Body:", JSON.stringify(planData));

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planData),
      });

      const text = await response.text();
      if (!response.ok) {
        console.log("Response Status:", response.status);
        console.log("Response Text:", text);
        let errorMessage = `Erro ao salvar na API (Status: ${response.status})`;
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Servidor retornou HTML ou resposta inválida: ${text.substring(
            0,
            100
          )}...`;
        }
        throw new Error(errorMessage);
      }

      const responseData = JSON.parse(text);
      const updatedPlan = {
        id: responseData.id || selectedPlan.id,
        icon: formData.get("icon") || "FaStar",
        nomePlano: responseData.nome_plano,
        valor: parseFloat(responseData.valor),
        fidelidade: responseData.fidelidade || 0,
        descricao: responseData.descricao,
        benefits: responseData.beneficios || [],
        fidelidadesExtras: responseData.fidelidades_extras || [],
        especialidades: responseData.especialidades || [],
      };

      if (isAddingPlan) {
        setPlans([...plans, updatedPlan]);
      } else {
        setPlans(
          plans.map((p) => (p.id === selectedPlan.id ? updatedPlan : p))
        );
      }
      setSelectedPlan(null);
      setIsAddingPlan(false);
      setBenefits([]);
      setExtraFidelities([]);
      setSpecialties([]);
      setError(null);
    } catch (error) {
      setError("Erro ao salvar na API: " + error.message);
      console.error("API Error:", error);
    }
  };

  const handleIconSelect = (iconName) => {
    setSelectedPlan({ ...selectedPlan, icon: iconName });
    setIsDropdownOpen(false);
  };

  const handleCancel = () => {
    setSelectedPlan(null);
    setIsAddingPlan(false);
    setBenefits([]);
    setExtraFidelities([]);
    setSpecialties([]);
    setError(null);
  };

  const addFidelityExtra = () => {
    setExtraFidelities([
      ...extraFidelities,
      { preco: 0, periodo: "", id: `fidelity-new-${Date.now()}` },
    ]);
  };

  const removeFidelityExtra = (id) => {
    setExtraFidelities(extraFidelities.filter((fidelity) => fidelity.id !== id));
  };

  const updateFidelityExtra = (id, field, value) => {
    setExtraFidelities(
      extraFidelities.map((fidelity) =>
        fidelity.id === id ? { ...fidelity, [field]: value } : fidelity
      )
    );
  };

  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const removeBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const updateBenefit = (index, value) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    setBenefits(updatedBenefits);
  };

  const addSpecialty = () => {
    if (availableSpecialties.length === 0) return; // Prevent adding if no specialties are available
    setSpecialties([
      ...specialties,
      {
        nome: availableSpecialties[0].nome,
        consultationCount: "0",
        id: `specialty-new-${Date.now()}`,
      },
    ]);
  };

  const removeSpecialty = (id) => {
    setSpecialties(specialties.filter((specialty) => specialty.id !== id));
  };

  const updateSpecialty = (id, field, value) => {
    setSpecialties(
      specialties.map((specialty) =>
        specialty.id === id ? { ...specialty, [field]: value } : specialty
      )
    );
  };

  const selectedIcon = iconOptions.find(
    (opt) => opt.name === selectedPlan?.icon
  )?.component || <FaStar />;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Section>
      <h2>Configuração de Planos</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isAddingPlan || selectedPlan ? (
        <div>
          <h3>{isAddingPlan ? "Adicionar Plano" : "Editar Plano"}</h3>
          <Form onSubmit={handlePlanFormSubmit}>
            <FormGroup>
              <label htmlFor="nomePlano">Título</label>
              <Input
                type="text"
                id="nomePlano"
                name="nomePlano"
                defaultValue={selectedPlan?.nomePlano || ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="descricao">Descrição</label>
              <Input
                type="text"
                id="descricao"
                name="descricao"
                defaultValue={selectedPlan?.descricao || ""}
              />
            </FormGroup>
            <FormGroup>
              <label>Valor Base (R$)</label>
              <FidelityBaseContainer>
                <Input
                  type="number"
                  id="valor"
                  name="valor"
                  defaultValue={selectedPlan?.valor || 0}
                  min="0"
                  step="0.01"
                  required
                  style={{ width: "60%" }}
                />
                <Input
                  type="number"
                  id="fidelidade"
                  name="fidelidade"
                  defaultValue={selectedPlan?.fidelidade || 0}
                  min="0"
                  placeholder="Meses de fidelidade"
                  style={{ width: "40%" }}
                />
              </FidelityBaseContainer>
            </FormGroup>
            <FormGroup>
              <label htmlFor="icon">Ícone</label>
              <SelectContainer ref={dropdownRef}>
                <SelectedOption
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {selectedIcon} {selectedPlan?.icon || "Selecione um ícone"}
                  </span>
                  <FaChevronDown />
                </SelectedOption>
                {isDropdownOpen && (
                  <Dropdown>
                    {iconOptions.map((option) => (
                      <Option
                        key={option.name}
                        onClick={() => handleIconSelect(option.name)}
                      >
                        {option.component} {option.name}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
              <input
                type="hidden"
                name="icon"
                value={selectedPlan?.icon || "FaStar"}
              />
            </FormGroup>
            <FormGroup>
              <label>Benefícios</label>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <Textarea
                    name={`benefits[${index}]`}
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder="Digite um benefício (inclua subtítulos e detalhes)"
                    required
                  />
                  <Button type="button" onClick={() => removeBenefit(index)}>
                    Remover
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addBenefit}>
                <FaPlus /> Adicionar Benefício
              </Button>
            </FormGroup>
            <FormGroup>
              <label>Fidelidades Extras</label>
              <ExtraFidelityContainer>
                {extraFidelities.map((fidelity, index) => (
                  <ExtraFidelityItem key={fidelity.id}>
                    <Input
                      type="number"
                      name={`fidelidadesExtrasPreco[${index}]`}
                      value={fidelity.preco}
                      onChange={(e) =>
                        updateFidelityExtra(fidelity.id, "preco", e.target.value)
                      }
                      min="0"
                      step="0.01"
                      placeholder="Preço (R$)"
                      required
                    />
                    <Input
                      type="text"
                      name={`fidelidadesExtrasPeriodo[${index}]`}
                      value={fidelity.periodo}
                      onChange={(e) =>
                        updateFidelityExtra(fidelity.id, "periodo", e.target.value)
                      }
                      placeholder="Período (ex: 3 meses)"
                      required
                    />
                    <RemoveButton
                      type="button"
                      onClick={() => removeFidelityExtra(fidelity.id)}
                    >
                      <FaTrash />
                    </RemoveButton>
                  </ExtraFidelityItem>
                ))}
                <Button type="button" onClick={addFidelityExtra}>
                  <FaPlus /> Adicionar Fidelidade
                </Button>
              </ExtraFidelityContainer>
            </FormGroup>
            <FormGroup>
              <label>Especialidades</label>
              <ExtraFidelityContainer>
                {specialties.map((specialty, index) => (
                  <SpecialtyItem key={specialty.id}>
                    <Select
                      name={`especialidadesNome[${index}]`}
                      value={specialty.nome}
                      onChange={(e) =>
                        updateSpecialty(specialty.id, "nome", e.target.value)
                      }
                      required
                    >
                      {availableSpecialties.length > 0 ? (
                        availableSpecialties.map((s) => (
                          <option key={s.id} value={s.nome}>
                            {s.nome}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          Nenhuma especialidade disponível
                        </option>
                      )}
                    </Select>
                    <Input
                      type="number"
                      name={`especialidadesConsultationCount[${index}]`}
                      value={specialty.consultationCount}
                      onChange={(e) =>
                        updateSpecialty(specialty.id, "consultationCount", e.target.value)
                      }
                      min="0"
                      placeholder="Nº de consultas"
                      required
                    />
                    <RemoveButton
                      type="button"
                      onClick={() => removeSpecialty(specialty.id)}
                    >
                      <FaTrash />
                    </RemoveButton>
                  </SpecialtyItem>
                ))}
                <Button
                  type="button"
                  onClick={addSpecialty}
                  disabled={availableSpecialties.length === 0}
                >
                  <FaPlus /> Adicionar Especialidade
                </Button>
              </ExtraFidelityContainer>
            </FormGroup>
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={handleCancel}>
              Cancelar
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          <Button onClick={handleAddPlan}>Adicionar Plano</Button>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Valor Base (R$)</th>
                  <th>Fidelidades Extras</th>
                  <th>Benefícios</th>
                  <th>Especialidades</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nomePlano}</td>
                    <td>{p.descricao || "-"}</td>
                    <td>
                      {p.valor.toFixed(2)}
                      {p.fidelidade > 0
                        ? ` (${p.fidelidade} ${
                            p.fidelidade === 1 ? "mês" : "meses"
                          } de fidelidade)`
                        : ""}
                    </td>
                    <td>
                      {p.fidelidadesExtras
                        ?.map((f) => `${f.preco.toFixed(2)}/${f.periodo}`)
                        .join(", ") || "-"}
                    </td>
                    <td>{p.benefits?.join(", ") || "-"}</td>
                    <td>
                      {p.especialidades
                        ?.map((s) => `${s.nome} (${s.consultationCount} consultas)`)
                        .join(", ") || "-"}
                    </td>
                    <td>
                      <Button onClick={() => handleEditPlan(p)}>Editar</Button>
                      <Button onClick={() => handleDeletePlan(p.id)}>
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Section>
  );
};

export default PlanosConfig;