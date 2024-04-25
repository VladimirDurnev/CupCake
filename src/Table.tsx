import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import {
    fetchFirst,
    fetchSecond,
    fetchThird,
    selectData,
    setEurUsd,
    setIsLoading,
    setRubEur,
    setRubUsd,
} from "./Redux/dataSlice";

export const Table = () => {
    const dispatch = useAppDispatch();
    const { test, isLoading } = useAppSelector(selectData);
    useEffect(() => {
        const pollServer = () => {
            setTimeout(() => {
                dispatch(fetchFirst());
                dispatch(fetchSecond());
                dispatch(fetchThird());
                dispatch(setRubUsd());
                dispatch(setRubEur());
                dispatch(setEurUsd());
                pollServer();
            }, 5000);
        };

        Promise.all([
            dispatch(fetchFirst()),
            dispatch(fetchSecond()),
            dispatch(fetchThird()),
        ]).then(() => {
            dispatch(setRubUsd()), 
            dispatch(setRubEur()), 
            dispatch(setEurUsd());
            dispatch(setIsLoading());
            pollServer();
        });
    }, []);

    return (
        <>
            {isLoading && <>Loading...</>}
            <table>
                <thead>
                    <tr>
                        <th scope="col">Pair name/market</th>
                        <th scope="col">First</th>
                        <th scope="col">Second</th>
                        <th scope="col">Third</th>
                    </tr>
                </thead>
                <tbody>
                    {test.map((item, index) => (
                        <tr key={index}>
                            {item.map((item, innerIndex) => (
                                <td key={index - innerIndex}>
                                    {typeof item === "number"
                                        ? item.toFixed(1)
                                        : item}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
