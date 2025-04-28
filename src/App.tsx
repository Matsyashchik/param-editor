import React from 'react';

// Определение интерфейсов
interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors: any[]; // Color[] будет определен отдельно
}

interface Props {
    params: Param[];
    model: Model;
}

// Определение состояния компонента
interface State {
    paramValues: { [key: number]: string };
    colors: string[];
}

// Компонент редактора параметров
class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // Инициализация состояния с начальными значениями параметров
        const initialParamValues = props.model.paramValues.reduce((acc, paramValue) => {
            acc[paramValue.paramId] = paramValue.value;
            return acc;
        }, {} as { [key: number]: string });

        this.state = {
            paramValues: initialParamValues,
            colors: props.model.colors,
        };
    }

    // Метод для получения полной структуры модели
    public getModel(): Model {
        const {paramValues, colors} = this.state;

        // Преобразование состояния в структуру Model
        const paramValuesArray = Object.keys(paramValues).map(key => ({
            paramId: Number(key),
            value: paramValues[key],
        }));

        return {
            paramValues: paramValuesArray,
            colors: colors,
        };
    }

    // Обработчик изменения значения параметра
    private handleChange = (paramId: number, value: string) => {
        this.setState(prevState => ({
            paramValues: {
                ...prevState.paramValues,
                [paramId]: value,
            },
        }));
    };

    render() {
        const {params} = this.props;
        const {paramValues} = this.state;

        return (
            <main>
                <h2>Редактор параметров</h2>
                {params.map(param => (
                    <div key={param.id} className={"param-field"}>
                        <label>{param.name}</label>
                        <input
                            type="text"
                            value={paramValues[param.id] || ''}
                            onChange={(e) => this.handleChange(param.id, e.target.value)}
                        />
                    </div>
                ))}
                <button onClick={() => console.log(this.getModel())}>Получить модель</button>
            </main>
        );
    }
}

// Пример использования компонента
const paramsExample: Param[] = [
    {id: 1, name: "Назначение", type: 'string'},
    {id: 2, name: "Длина", type: 'string'},
];

const modelExample: Model = {
    paramValues: [
        {paramId: 1, value: "повседневное"},
        {paramId: 2, value: "макси"},
    ],
    colors: [],
};

// Основной компонент приложения
interface AppProps {
    params?: ({ id: number; name: string; type: string } | { id: number; name: string; type: string })[]
}

const App = ({params}: AppProps) => (
    <>
        <ParamEditor params={paramsExample} model={modelExample}/>
    </>
);

export default App;