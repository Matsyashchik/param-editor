import React from 'react';

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
  colors?: string[]; // Добавлено для расширяемости
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string }; // Хранит значения параметров по их id
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Инициализируем состояние значениями из модели
    const initialParamValues = props.model.paramValues.reduce((acc, paramValue) => {
      acc[paramValue.paramId] = paramValue.value;
      return acc;
    }, {} as { [key: number]: string });

    this.state = {
      paramValues: initialParamValues,
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  getModel(): Model {
    const { params } = this.props;
    const { paramValues } = this.state;

    const paramValuesArray = params.map(param => ({
      paramId: param.id,
      value: paramValues[param.id] || '',
    }));

    return {
      paramValues: paramValuesArray,
      colors: [], // Можно добавить логику для работы с цветами
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map(param => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={paramValues[param.id] || ''}
              onChange={(e) => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ParamEditor