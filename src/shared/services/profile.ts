import { UserData } from '../types';

const toOptionalString = (value: any): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  return String(value);
};

const SEX_LABELS: Record<string, string> = {
  MASCULINO: 'Masculino',
  FEMININO: 'Feminino',
  OUTRO: 'Outro',
};

const TIME_LABELS: Record<string, string> = {
  MANHA: 'Manhã',
  TARDE: 'Tarde',
  NOITE: 'Noite',
  FLEXIVEL: 'Flexível',
};

const FOCUS_LABELS: Record<string, string> = {
  PERDA_PESO: 'Perda de peso',
  GANHO_MASSA: 'Ganho de massa muscular',
  CONDICIONAMENTO: 'Condicionamento físico',
  FORTALECIMENTO: 'Fortalecimento',
  FLEXIBILIDADE: 'Flexibilidade',
  SAUDE_GERAL: 'Saúde geral',
};

const prettifyEnumLabel = (value: string | undefined, map: Record<string, string>): string | undefined => {
  if (!value) {
    return undefined;
  }
  const upper = value.toString().toUpperCase();
  return map[upper] || value;
};

const prettifyFocusList = (focus?: string[]): string[] | undefined => {
  if (!Array.isArray(focus) || focus.length === 0) {
    return undefined;
  }
  return focus.map(item => {
    const upper = item?.toString().toUpperCase();
    return (upper && FOCUS_LABELS[upper]) || item;
  });
};

const ensureBaseUserData = (base: UserData | undefined, payload: any): UserData => {
  const user = payload?.user || payload || {};
  const name = base?.primeiroNome || user.name || base?.nomeDoMeio;
  const nameParts = (name || '').trim().split(/\s+/).filter(Boolean);
  const [primeiroNome, ...resto] = nameParts.length ? nameParts : (user.name || '').trim().split(/\s+/).filter(Boolean);

  const inferredUserType = base?.userType
    || (user.role === 'PERSONAL' ? 'personal' : user.role === 'ALUNO' ? 'aluno' : undefined);

  return {
    ...base,
    primeiroNome: base?.primeiroNome || primeiroNome || user.name || 'Usuário',
    nomeDoMeio: base?.nomeDoMeio || (resto.length ? resto.join(' ') : undefined),
    email: base?.email || user.email,
    uid: base?.uid || user.id,
    userType: inferredUserType,
  };
};

export const mapProfilePayloadToUserData = (base: UserData | undefined, payload: any): UserData => {
  const normalizedBase = ensureBaseUserData(base, payload);
  const userType = normalizedBase.userType || (payload?.user?.role === 'PERSONAL' ? 'personal' : 'aluno');
  const source = payload?.user || payload || {};

  if (userType === 'aluno') {
    const alunoProfile = payload?.user || payload;
    const personalInfo = alunoProfile?.personal;

    return {
      ...normalizedBase,
      idade: toOptionalString(alunoProfile?.age ?? source.age),
      peso: toOptionalString(alunoProfile?.weight ?? source.weight),
      altura: toOptionalString(alunoProfile?.height ?? source.height),
      doenca: toOptionalString(alunoProfile?.illness ?? source.illness ?? normalizedBase.doenca),
      sexo: prettifyEnumLabel(alunoProfile?.sex ?? source.sex, SEX_LABELS) || normalizedBase.sexo,
      horario: prettifyEnumLabel(alunoProfile?.time ?? source.time, TIME_LABELS) || normalizedBase.horario,
      focos: prettifyFocusList(alunoProfile?.focus ?? source.focus) || normalizedBase.focos,
      linkStatus: alunoProfile?.linkStatus ?? source.linkStatus ?? normalizedBase.linkStatus,
      personal: personalInfo
        ? {
            id: personalInfo.id,
            name: personalInfo.name,
            email: personalInfo.email,
            phone: personalInfo.phone,
          }
        : normalizedBase.personal,
    };
  }

  const personalProfile = payload?.user || payload;
  const students = personalProfile?.linkedStudents || personalProfile?.alunos;

  return {
    ...normalizedBase,
    training: personalProfile?.training ?? normalizedBase.training,
    linkedStudents: Array.isArray(students)
      ? students.map((student: any) => ({
          id: student.id || student.uid,
          name: student.name || student.nome,
          email: student.email,
          linkStatus: student.linkStatus,
        }))
      : normalizedBase.linkedStudents,
  };
};
