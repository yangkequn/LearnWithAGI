import { ExploreComponent } from './index';
import ContextComponent, { Context } from './Context';
import AppFrame from '@/component/appFrame';
import { useContext, useEffect, useState } from 'react';
import { API } from '../../component/api';


function StaticHomeWithinContext({ Topic, skillTree }) {
    const { setTopicName, setSkillTree } = useContext(Context);
    const [subComponent, setSubComponent] = useState(null);

    useEffect(() => {
        setTopicName(Topic);
        setSkillTree(skillTree);
        setSubComponent(
            <AppFrame>
                <ExploreComponent />
            </AppFrame>
        );
    }, [Topic, skillTree]);

    return subComponent;
}
export function StaticHome({ Topic, tree }) {
    return (
        <ContextComponent>
            <StaticHomeWithinContext Topic={Topic} skillTree={tree} NoneBs="keq" />
        </ContextComponent>
    );
}
export const getStaticPaths = async () => {
    const possibleValues = ['儿童之心:解锁孩子行为背后的心理学密码'];
    const paths = possibleValues.map((value) => ({
        params: { t: value },
    }));
    return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
    const { t } = params;
    const Name = t.split(":")[0], Detail = t.split(":")[1]
    const tree = await API("SkillLoadList", { Name, Detail, Id: 7755411967701254 }).then((tree) => {
        //sort sessions by session.ChapterSession
        tree?.Sessions?.sort((a, b) => a.ChapterSession - b.ChapterSession)
        return tree
    }).catch((err) => {
        return null
    })
    return { props: { Topic: t, tree: tree || null } };
};

export default StaticHome;
