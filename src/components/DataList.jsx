import { useApi } from "../contexts/ApiContext";
import { useMemo } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box,
} from "@mui/material";

export default function DataList() {
    const { data, type, errorMessage } = useApi();

    const listItems = useMemo(() => {
        if (!Array.isArray(data) || !data.length) return [];

        return data.map((item) => {
            if (type === "character") {
                return (
                    <Grid item xs={12} sm={6} md={4} key={item.id} spacing={1} size={3}>
                        <Card sx={{ display: "flex", flexDirection: "column", width: "100%", minHeight: 450 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: "100%"}}
                                image={item.image}
                                alt={item.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.status} - {item.species}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Localização: {item.location?.name || "Desconhecida"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Origem: {item.origin?.name || "Desconhecida"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            }

            if (type === "episode") {
                return (
                    <Grid item xs={12} sm={6} md={4} spacing={1} size={3} key={item.id}>
                        <Card sx={{ width: "100%", minHeight: 150 }}>
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.episode}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Personagens: {item.characters?.length || 0}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            }

            if (type === "location") {
                return (
                    <Grid item xs={12} sm={6} md={4} spacing={1} size={3} key={item.id}>
                        <Card sx={{ width: "100%", minHeight: 150 }} >
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Dimensão: {item.dimension || "Desconhecida"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tipo: {item.type || "Desconhecida"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Residentes: {item.residents?.length || 0}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            }

            return null;
        });
    }, [data, type]);

    if (errorMessage) {
        return (
            <Typography color="error" variant="body1" align="center" sx={{ mt: 3 }}>
                {errorMessage}
            </Typography>
        );
    }

    if (data?.length) {
        return (
            <Box>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Listando {type}s
                </Typography>
                <Grid container spacing={2}>
                    {listItems}
                </Grid>
            </Box>
        );
    }
}
