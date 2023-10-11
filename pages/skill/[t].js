import { useRouter } from 'next/router';
import { ExploreComponent } from './index';


const SkillPage = ({ t }) => <ExploreComponent topic={t} />



export const getStaticPaths = async () => {
    //const possibleValues = ['隋唐名将与战争策略:分析隋唐时代的重要名将及其战争策略，探究背后的智谋与胆识。', '两位数加法:学习和理解两位数的加法', '推理小说的进化：从福尔摩斯到东野圭吾:追溯推理小说的历史发展，对比东野圭吾与经典福尔摩斯等作品的异同。'];
    const possibleValues = ['隋唐名将与战争策略:分析隋唐时代的重要名将及其战争策略，探究背后的智谋与胆识。'];
    const paths = possibleValues.map((value) => ({
        params: { t: value },
    }));
    return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
    const { t } = params;
    return { props: { t } };
};

export default SkillPage;
