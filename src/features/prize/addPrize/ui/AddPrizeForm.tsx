import {Trash2} from "lucide-react";
import {PrizeForm, PrizeItem, PrizeList, Select} from "./AddPrizeFormStyled.ts";
import {Button, Input} from "../../../auth/login/ui/LoginFormStyled.ts";
import React, {useState} from "react";
import type {FC} from 'react';
import type {Prize} from "../../../../shared/ui/Wheel/Wheel.tsx";
import {icons} from "../../../../shared/ui/Wheel/Wheel.tsx";

type AddPrizeFormProps = {
  prizes: Prize[];
  setPrizes: React.Dispatch<React.SetStateAction<Prize[]>>;
}

export const AddPrizeForm: FC<AddPrizeFormProps> = (props) => {
  const {prizes, setPrizes} = props;
  const [newPrize, setNewPrize] = useState({ name: "", icon: "Gift" as keyof typeof icons });

  const addPrize = () => {
    if (!newPrize.name.trim()) return;
    setPrizes([...prizes, { id: Date.now(), ...newPrize }]);
    setNewPrize({ name: "", icon: "Gift" });
  };

  const removePrize = (id: number) => {
    setPrizes(prizes.filter((p) => p.id !== id));
  };

  const IconComponent = (name: keyof typeof icons) => {
    const Icon = icons[name];
    return <Icon size={20} color="#ff4d6d" />;
  };
  return (
    <PrizeList>
      <h3>🎯 Призы</h3>

      <PrizeForm>
        <Input
          type="text"
          placeholder="Название приза"
          value={newPrize.name}
          onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })}
        />
        <Select
          value={newPrize.icon}
          onChange={(e) => setNewPrize({ ...newPrize, icon: e.target.value as keyof typeof icons })}
        >
          {Object.keys(icons).map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </Select>
        <Button onClick={addPrize}>Добавить приз</Button>
      </PrizeForm>

      {prizes.map((prize) => (
        <PrizeItem key={prize.id}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {IconComponent(prize.icon)}
            {prize.name}
          </div>
          <Trash2
            size={18}
            color="#ff4d6d"
            style={{ cursor: "pointer" }}
            onClick={() => removePrize(prize.id)}
          />
        </PrizeItem>
      ))}
    </PrizeList>
  );
};

