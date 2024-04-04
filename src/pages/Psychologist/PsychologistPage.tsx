import { PsychologistList } from "../../components/PsychologistList/PsychologistList";
import css from "./PsychologistPage.module.css";
import { Filter } from "../../components/Filter/Filter";

// import { ScrollUp } from '../../components/ScrollUp/ScrollUp';

const PsychologistPage = () => {
  return (
    <section className={css.section}>
      <div className="container">
        <Filter />
        <PsychologistList />
        {/* <ScrollUp /> */}
      </div>
    </section>
  );
};

// const PsychologistPage = () => {
//   return (
//     <section className={css.section}>
//       <div className="container">
//         <h1>Helooo</h1>
//       </div>
//     </section>
//   );
// };

export default PsychologistPage;
